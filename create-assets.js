const fs = require('fs');
const path = require('path');

// Simple 1x1 PNG with transparency (smallest valid PNG)
// Icon: 1024x1024 recommended
const createPNG = (width, height, r, g, b, a = 255) => {
  const { PNG } = require('pngjs');
  const png = new PNG({ width, height });
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      png.data[idx] = r;     // red
      png.data[idx + 1] = g; // green
      png.data[idx + 2] = b; // blue
      png.data[idx + 3] = a; // alpha
    }
  }
  
  return PNG.sync.write(png);
};

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}

// Install pngjs if needed
try {
  require('pngjs');
} catch (e) {
  console.log('Installing pngjs...');
  require('child_process').execSync('npm install pngjs --no-save', { stdio: 'inherit' });
}

const { PNG } = require('pngjs');

// Create icon.png (1024x1024 - white background with blue square)
const icon = new PNG({ width: 1024, height: 1024 });
for (let y = 0; y < 1024; y++) {
  for (let x = 0; x < 1024; x++) {
    const idx = (1024 * y + x) << 2;
    // Create a simple blue square in the center
    if (x > 256 && x < 768 && y > 256 && y < 768) {
      icon.data[idx] = 76;      // R
      icon.data[idx + 1] = 175; // G
      icon.data[idx + 2] = 80;  // B
      icon.data[idx + 3] = 255; // A
    } else {
      icon.data[idx] = 255;     // R (white)
      icon.data[idx + 1] = 255; // G
      icon.data[idx + 2] = 255; // B
      icon.data[idx + 3] = 255; // A
    }
  }
}
fs.writeFileSync(path.join(assetsDir, 'icon.png'), PNG.sync.write(icon));
console.log('Created icon.png');

// Create adaptive-icon.png (1024x1024)
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), PNG.sync.write(icon));
console.log('Created adaptive-icon.png');

// Create splash.png (1284x2778 for iPhone 13 Pro Max)
const splash = new PNG({ width: 1284, height: 2778 });
for (let y = 0; y < 2778; y++) {
  for (let x = 0; x < 1284; x++) {
    const idx = (1284 * y + x) << 2;
    splash.data[idx] = 255;     // R (white)
    splash.data[idx + 1] = 255; // G
    splash.data[idx + 2] = 255; // B
    splash.data[idx + 3] = 255; // A
  }
}
fs.writeFileSync(path.join(assetsDir, 'splash.png'), PNG.sync.write(splash));
console.log('Created splash.png');

// Create favicon.png (48x48)
const favicon = new PNG({ width: 48, height: 48 });
for (let y = 0; y < 48; y++) {
  for (let x = 0; x < 48; x++) {
    const idx = (48 * y + x) << 2;
    // Simple green square
    favicon.data[idx] = 76;      // R
    favicon.data[idx + 1] = 175; // G
    favicon.data[idx + 2] = 80;  // B
    favicon.data[idx + 3] = 255; // A
  }
}
fs.writeFileSync(path.join(assetsDir, 'favicon.png'), PNG.sync.write(favicon));
console.log('Created favicon.png');

console.log('All assets created successfully!');
