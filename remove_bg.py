import os
from PIL import Image

input_path = 'public/profile.jpg'
output_path = 'public/profile-cutout.png'

try:
    from rembg import remove
    print("Removing background using rembg...")
    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input_bytes = i.read()
            output_bytes = remove(input_bytes)
            o.write(output_bytes)
    print("Successfully created public/profile-cutout.png with rembg!")
except Exception as e:
    print(f"rembg failed/not ready: {e}. Generating high quality arched cutout PNG...")
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    # Create smooth rounded arch mask
    import math
    mask = Image.new("L", (w, h), 0)
    for y in range(h):
        for x in range(w):
            # Arch top
            if y < h * 0.4:
                cx, cy = w / 2, h * 0.4
                rx, ry = w / 2, h * 0.4
                val = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2
                if val <= 1.0:
                    mask.putpixel((x, y), 255)
            else:
                # Body bottom width
                margin = int(w * 0.05)
                if margin <= x <= w - margin:
                    mask.putpixel((x, y), 255)
    img.putalpha(mask)
    img.save(output_path)
    print("Saved arched cutout PNG to public/profile-cutout.png!")
