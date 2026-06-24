import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const inputVideo = "https://res.cloudinary.com/dox4hbvgw/video/upload/v1782270270/Satellite_zooming_out_from_Earth_202606202308_i7ppso.mp4";
const framesDir = path.resolve('public', 'frames');

if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

console.log('Checking input video...');

try {
  console.log('Extracting frames with FFmpeg...');
  // Extract frames as compressed JPEGs
  // -vf scale=1280:720 to keep high resolution but highly compressed
  // -q:v 4 for high-to-medium quality (1-31 scale, lower is better)
  const ffmpegCmd = `ffmpeg -y -i "${inputVideo}" -vf "scale=1280:720" -q:v 5 "${path.join(framesDir, 'frame_%03d.jpg')}"`;
  console.log('Executing command:', ffmpegCmd);
  execSync(ffmpegCmd, { stdio: 'inherit' });

  // Count the extracted frames
  const files = fs.readdirSync(framesDir).filter(f => f.startsWith('frame_') && f.endsWith('.jpg'));
  console.log(`Successfully extracted ${files.length} frames!`);
  
  // Log total size of frames
  let totalSize = 0;
  files.forEach(file => {
    totalSize += fs.statSync(path.join(framesDir, file)).size;
  });
  console.log(`Total frame sequence size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  
} catch (err) {
  console.error('Failed to extract frames:', err);
  process.exit(1);
}
