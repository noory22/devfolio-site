const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('--- STARTING PORTABLE SINGLE-FILE BUNDLING ---');

// 1. Run standard production build
try {
  console.log('Running npm run build...');
  execSync('npm run build', { stdio: 'inherit' });
} catch (err) {
  console.error('Build failed!', err);
  process.exit(1);
}

console.log('\nBuild succeeded. Encoding and packaging assets...');

// Helper to recursively get all files in a directory
function getFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Helper to get mime type
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.gif': return 'image/gif';
    case '.webp': return 'image/webp';
    case '.woff': return 'font/woff';
    case '.woff2': return 'font/woff2';
    case '.ttf': return 'font/ttf';
    case '.json': return 'application/json';
    default: return 'application/octet-stream';
  }
}

// 2. Read all assets in public/assets and compile base64 map
const assetsDir = path.join(__dirname, 'public/assets');
const assetFiles = getFilesRecursively(assetsDir);
const assetMap = {};

assetFiles.forEach((file) => {
  // Get relative path from public/ (e.g. assets/logo.png)
  const relativePath = path.relative(path.join(__dirname, 'public'), file).replace(/\\/g, '/');
  const mimeType = getMimeType(file);
  const base64Data = fs.readFileSync(file).toString('base64');
  const dataUri = `data:${mimeType};base64,${base64Data}`;
  
  assetMap[`/${relativePath}`] = dataUri;
  assetMap[relativePath] = dataUri;
});

console.log(`Successfully base64 encoded ${Object.keys(assetMap).length / 2} asset files.`);

// 3. Find built CSS and JS files
const distAssetsDir = path.join(__dirname, 'dist/assets');
const distFiles = fs.readdirSync(distAssetsDir);

let cssContent = '';
let jsContent = '';

distFiles.forEach((file) => {
  const filePath = path.join(distAssetsDir, file);
  if (file.endsWith('.css')) {
    cssContent += fs.readFileSync(filePath, 'utf8') + '\n';
  } else if (file.endsWith('.js')) {
    jsContent += fs.readFileSync(filePath, 'utf8') + '\n';
  }
});

// 4. Read dist/index.html and prepare container
const htmlPath = path.join(__dirname, 'dist/index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Remove original external asset tags
htmlContent = htmlContent.replace(/<link rel="stylesheet"[^>]+href="\/assets\/[^>]+>/g, '');
htmlContent = htmlContent.replace(/<script type="module"[^>]+src="\/assets\/[^>]+><\/script>/g, '');

// Inline CSS and JS
const styleTag = `<style>${cssContent}</style>`;
htmlContent = htmlContent.replace('</head>', `${styleTag}\n</head>`);

const scriptTag = `<script type="module">${jsContent}</script>`;
htmlContent = htmlContent.replace('</body>', `${scriptTag}\n</body>`);

// 5. Replace all occurrences of assets path in entire HTML string with base64 URIs
console.log('Inlining all asset path occurrences with Base64 data...');
// Sort paths by length descending to prevent partial path match replacements
const sortedPaths = Object.keys(assetMap).sort((a, b) => b.length - a.length);

sortedPaths.forEach((urlPath) => {
  const dataUri = assetMap[urlPath];
  const escapedPath = urlPath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  htmlContent = htmlContent.replace(new RegExp(escapedPath, 'g'), dataUri);
});

// 6. Write final bundle to E:\HussainTest\index.html
const destDir = 'E:\\HussainTest';
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}
const destPath = path.join(destDir, 'index.html');
fs.writeFileSync(destPath, htmlContent, 'utf8');

console.log('\n--- BUNDLING COMPLETED ---');
console.log(`Single-File HTML generated successfully at: ${destPath}`);
console.log(`Final File Size: ${(fs.statSync(destPath).size / (1024 * 1024)).toFixed(2)} MB`);
