import numpy as np
from PIL import Image

# Load original profile.jpg
img = Image.open('public/profile.jpg').convert('RGBA')
arr = np.array(img)

# R, G, B channels
r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]

# Detect cricket grass/field (high green, or reddish boundary banner)
# Grass: Green is significantly higher than Red & Blue
grass_mask = (g > 70) & (g > r * 0.9) & (g > b * 1.1)

# Red advertising board in background: High Red, low Green/Blue
red_board_mask = (r > 130) & (r > g * 1.3) & (r > b * 1.3)

# Sky/faint top background
top_bg_mask = (arr.shape[0] * 0.3 > np.indices(r.shape)[0]) & (g > 100) & (b > 100)

bg_mask = grass_mask | red_board_mask

# Keep person (cricketer in blue jersey & helmet & white pads)
alpha = np.ones(r.shape, dtype=np.uint8) * 255

# Apply smooth falloff mask around subject
h, w = r.shape
for y in range(h):
    for x in range(w):
        # Center subject area is roughly x: 300 to 780, y: 150 to 950
        if not (0.28 * w <= x <= 0.72 * w and 0.15 * h <= y <= 0.98 * h):
            alpha[y, x] = 0
        elif bg_mask[y, x]:
            # Check if it's grass/background around the subject
            # Preserve blue jersey (high blue/cyan: b > 100, b > r)
            if not (b[y, x] > 110 and b[y, x] > r[y, x]):
                alpha[y, x] = 0

arr[:, :, 3] = alpha
result = Image.fromarray(arr)
result.save('public/profile-cutout.png')
print("Successfully generated clean cricketer subject cutout in public/profile-cutout.png!")
