const fs = require('fs').promises;
const path = require('path');
const { getPlaiceholder } = require('plaiceholder');

async function generateBlurDataUrl(imagePath) {
  try {
    const buffer = await fs.readFile(imagePath);
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error);
    return null;
  }
}

async function processImages() {
  const publicDir = path.join(process.cwd(), 'public');
  const outputFile = path.join(process.cwd(), 'src', 'lib', 'blur-data.ts');
  
  // Get all image files from public directory
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const publicFiles = await fs.readdir(publicDir);
  const imageFiles = publicFiles
    .filter(file => imageExtensions.some(ext => file.toLowerCase().endsWith(ext)))
    .map(file => `/${file}`);
  
  const blurData = {};
  
  console.log('Generating blur data URLs...\n');
  
  for (const imageFile of imageFiles) {
    const imagePath = path.join(publicDir, imageFile);
    console.log(`Processing: ${imageFile}`);
    
    const blurDataUrl = await generateBlurDataUrl(imagePath);
    if (blurDataUrl) {
      blurData[imageFile] = blurDataUrl;
      console.log(`✓ Generated blur data for ${imageFile}`);
    }
  }
  
  // Write to TypeScript file
  const tsContent = `// Auto-generated blur data URLs for images
// Run 'node scripts/generate-blur-data.js' to regenerate

export const blurDataUrls: Record<string, string> = ${JSON.stringify(blurData, null, 2)};

export function getBlurDataUrl(imagePath: string): string | undefined {
  return blurDataUrls[imagePath];
}
`;
  
  await fs.writeFile(outputFile, tsContent);
  console.log(`\n✓ Blur data saved to ${outputFile}`);
}

processImages().catch(console.error);
