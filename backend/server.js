import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
if (!process.env.SMTP_USER) {
    dotenv.config();
}
const app = express();
const port = 5000;

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure CORS with specific options
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3005'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Add OPTIONS preflight handler for all routes
app.options('*', cors());

// Metadata handling functions
// Serve static files with CORS headers
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static(uploadDir));

// Path to the metadata file
const metadataPath = path.join(__dirname, 'metadata.json');

// Initialize or load metadata
const initializeMetadata = () => {
    if (!fs.existsSync(metadataPath)) {
        fs.writeFileSync(metadataPath, JSON.stringify({}), 'utf-8');
        return {};
    }
    try {
        const data = fs.readFileSync(metadataPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading metadata:', err);
        return {};
    }
};

// Save metadata
const saveMetadata = (metadata) => {
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
};

// List uploaded images for the gallery
app.get('/api/images', (req, res) => {
    try {
        const metadata = initializeMetadata();
        const files = fs.readdirSync(uploadDir)
            .filter((f) => /\.(png|jpe?g|gif|webp)$/i.test(f))
            .map((f) => ({
                filename: f,
                url: `/uploads/${f}`,
                caption: metadata[f]?.caption || ''
            }));
        res.json({ 
            success: true,
            images: files 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            images: [], 
            message: 'Failed to list images' 
        });
    }
});

// Delete image endpoint
app.delete('/api/images/:filename', (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(uploadDir, filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }
        
        // Delete the file
        fs.unlinkSync(filePath);
        
        // Update metadata
        const metadata = initializeMetadata();
        if (metadata[filename]) {
            delete metadata[filename];
            saveMetadata(metadata);
        }
        
        res.json({ success: true, message: 'Image deleted successfully' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ success: false, message: 'Failed to delete image' });
    }
});

// Update image caption
app.put('/api/images/:filename/caption', (req, res) => {
    try {
        const { filename } = req.params;
        const { caption } = req.body;
        const filePath = path.join(uploadDir, filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }
        
        // Update metadata
        const metadata = initializeMetadata();
        metadata[filename] = { ...metadata[filename], caption };
        saveMetadata(metadata);
        
        res.json({ success: true, message: 'Caption updated successfully' });
    } catch (err) {
        console.error('Caption update error:', err);
        res.status(500).json({ success: false, message: 'Failed to update caption' });
    }
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed (JPEG, JPG, PNG, GIF)'));
        }
    }
}).single('image');

// Upload endpoint
app.post('/api/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ 
                success: false,
                message: err.message 
            });
        }
        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                message: 'No file uploaded' 
            });
        }
        
        // Save caption if provided
        const caption = req.body.caption;
        if (caption) {
            const metadata = initializeMetadata();
            metadata[req.file.filename] = { caption };
            saveMetadata(metadata);
        }
        
        res.json({ 
            success: true,
            message: 'File uploaded successfully',
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`
        });
    });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body || {};
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const newEntry = {
            id: Date.now(),
            name,
            email,
            message,
            createdAt: new Date().toISOString(),
        };

        const messagesFile = path.join(uploadDir, 'messages.json');
        let messages = [];
        try {
            if (fs.existsSync(messagesFile)) {
                const raw = fs.readFileSync(messagesFile, 'utf-8');
                messages = JSON.parse(raw || '[]');
            }
        } catch (readErr) {
            // If parsing fails, start a fresh array
            messages = [];
        }

        messages.push(newEntry);
        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');

        // Send email notification if SMTP is configured
        const {
            SMTP_HOST,
            SMTP_PORT,
            SMTP_SECURE,
            SMTP_USER,
            SMTP_PASS,
            NOTIFY_TO
        } = process.env;

        const sendEmailNotification = async () => {
            let transporter;
            let toAddress = NOTIFY_TO || SMTP_USER;

            if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
                transporter = nodemailer.createTransport({
                    host: SMTP_HOST,
                    port: Number(SMTP_PORT),
                    secure: String(SMTP_SECURE || 'false') === 'true',
                    auth: { user: SMTP_USER, pass: SMTP_PASS },
                });
            } else {
                const testAccount = await nodemailer.createTestAccount();
                transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false,
                    auth: { user: testAccount.user, pass: testAccount.pass },
                });
                toAddress = testAccount.user;
            }

            const info = await transporter.sendMail({
                from: `"Portfolio Contact Form" <${SMTP_USER || 'no-reply@example.com'}>`,
                to: toAddress,
                replyTo: `"${name}" <${email}>`,
                subject: `📬 New Message from ${name} via Portfolio`,
                text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}\n\nTime: ${newEntry.createdAt}`,
                html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1.5px solid #1D4ED8; border-radius: 16px; background-color: #FFFFFF;">
                        <div style="background-color: #1D4ED8; color: #F5F0E8; padding: 18px 24px; border-radius: 12px; margin-bottom: 24px;">
                            <h2 style="margin: 0; font-size: 1.3rem; font-weight: 800; letter-spacing: 0.04em;">📬 NEW CONTACT MESSAGE</h2>
                            <p style="margin: 6px 0 0; font-size: 0.85rem; opacity: 0.9;">From your Somay Naik Portfolio website</p>
                        </div>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 0.85rem; width: 90px; font-weight: 700;">FROM:</td>
                                <td style="padding: 10px 0; color: #111; font-size: 1rem; font-weight: 700;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 0.85rem; font-weight: 700;">EMAIL:</td>
                                <td style="padding: 10px 0; font-size: 1rem;"><a href="mailto:${email}" style="color: #1D4ED8; font-weight: 700; text-decoration: none;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 0.85rem; font-weight: 700;">RECEIVED:</td>
                                <td style="padding: 10px 0; color: #444; font-size: 0.88rem;">${new Date().toLocaleString()}</td>
                            </tr>
                        </table>
                        <div style="background-color: #F5F0E8; border-left: 4px solid #1D4ED8; border-radius: 8px; padding: 18px 22px; margin-bottom: 26px;">
                            <span style="display: block; font-size: 0.72rem; font-weight: 800; color: #1D4ED8; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px;">MESSAGE:</span>
                            <p style="margin: 0; color: #222; font-size: 1rem; line-height: 1.65; white-space: pre-wrap;">${message}</p>
                        </div>
                        <div style="text-align: center; border-top: 1px solid #E5E7EB; padding-top: 20px;">
                            <a href="mailto:${email}?subject=Re:%20Your%20message%20to%20Somay%20Naik" style="display: inline-block; background-color: #1D4ED8; color: #F5F0E8; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: 800; font-size: 0.88rem; letter-spacing: 0.05em;">Reply directly to ${name} &rarr;</a>
                        </div>
                    </div>
                `,
            });

            const previewUrl = nodemailer.getTestMessageUrl(info);
            if (previewUrl) {
                const previewFile = path.join(uploadDir, 'email_preview.txt');
                fs.writeFileSync(previewFile, `Preview URL: ${previewUrl}\n`, 'utf-8');
                console.log('Ethereal preview URL:', previewUrl);
            } else {
                console.log('Notification email delivered to:', toAddress, 'MessageId:', info.messageId);
            }
            return { delivered: true, messageId: info.messageId };
        };

        // Await email delivery with fallback
        try {
            await sendEmailNotification();
        } catch (emailErr) {
            console.error('Email sending error:', emailErr.message);
        }

        console.log('New contact message saved:', newEntry);
        return res.json({ success: true, message: 'Message sent! Your email was delivered directly to Somay.' });
    } catch (err) {
        console.error('Contact message error', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Delete image endpoint
app.delete('/api/images/:filename', (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(uploadDir, filename);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }
        
        // Delete the file
        fs.unlinkSync(filePath);
        
        // Remove from metadata
        const metadata = initializeMetadata();
        if (metadata[filename]) {
            delete metadata[filename];
            saveMetadata(metadata);
        }
        
        res.json({
            success: true,
            message: 'Image deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting image'
        });
    }
});

// Update caption endpoint
app.put('/api/images/:filename/caption', (req, res) => {
    try {
        const { filename } = req.params;
        const { caption } = req.body;
        
        if (!caption && caption !== '') {
            return res.status(400).json({
                success: false,
                message: 'Caption is required'
            });
        }
        
        const filePath = path.join(uploadDir, filename);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }
        
        // Update metadata
        const metadata = initializeMetadata();
        metadata[filename] = { ...metadata[filename], caption };
        saveMetadata(metadata);
        
        res.json({
            success: true,
            message: 'Caption updated successfully'
        });
    } catch (error) {
        console.error('Error updating caption:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating caption'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Upload directory: ${uploadDir}`);
});