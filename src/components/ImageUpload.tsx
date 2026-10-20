import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ImageMetadata {
  filename: string;
  url: string;
  caption: string;
}

interface UploadStatus {
  type: 'idle' | 'uploading' | 'success' | 'error';
  message: string;
}

const ImageUpload: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [status, setStatus] = useState<UploadStatus>({ 
    type: 'idle', 
    message: '' 
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setStatus({ type: 'error', message: 'Please select an image file' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'File size should be less than 5MB' });
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setStatus({ type: 'idle', message: '' });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setStatus({ type: 'error', message: 'Please select a file first' });
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('caption', caption);

    try {
      setStatus({ type: 'uploading', message: 'Uploading...' });
      
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit', // Changed from 'include' to 'omit' to fix CORS issues
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // If caption was provided, update the image metadata
        if (caption.trim() && data.filename) {
          try {
            const captionResponse = await fetch(`http://localhost:5000/api/images/${data.filename}/caption`, {
              method: 'PUT',
              mode: 'cors',
              credentials: 'omit', // Changed from 'include' to 'omit' to fix CORS issues
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ caption: caption.trim() })
            });
            
            if (!captionResponse.ok) {
              console.error('Failed to save caption:', captionResponse.statusText);
            }
          } catch (captionError) {
            console.error('Failed to save caption:', captionError);
            // Continue anyway since the image was uploaded successfully
          }
        }
        
        setStatus({ type: 'success', message: 'Upload successful!' });
        if (fileInputRef.current) fileInputRef.current.value = '';
        setSelectedFile(null);
        setPreviewUrl('');
        setCaption('');
        setTimeout(() => navigate('/gallery'), 700);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      setStatus({ 
        type: 'error', 
        message: error.message || 'Upload failed. Please check your network connection.' 
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Upload Image</h2>
      
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="max-h-48 mx-auto rounded"
            onLoad={() => URL.revokeObjectURL(previewUrl)}
          />
        ) : (
          <p className="text-gray-500">Click to select an image</p>
        )}
      </div>

      {previewUrl && (
        <div className="mt-4">
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
            Caption (optional)
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption to your image"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        {previewUrl && (
          <button
            type="button"
            onClick={() => {
              setSelectedFile(null);
              setPreviewUrl('');
              setCaption('');
              setStatus({ type: 'idle', message: '' });
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="px-4 py-2 text-sm border rounded"
          >
            Cancel
          </button>
        )}
        
        <button
          onClick={handleUpload}
          disabled={!selectedFile || status.type === 'uploading'}
          className={`px-4 py-2 text-sm text-white rounded ${
            !selectedFile || status.type === 'uploading'
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {status.type === 'uploading' ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {status.message && (
        <div className={`mt-3 p-2 text-sm rounded ${
          status.type === 'error' 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;