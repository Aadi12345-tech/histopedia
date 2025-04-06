/**
 * Utility to ensure all required images are available
 * This script checks for missing images and creates placeholders if needed
 */

import { checkAllImages } from './ImageChecker';

// Required monument images with fallbacks
const requiredImages = [
  { path: '/images/red-fort.jpg', fallback: '/images/redfort.jpg' },
  { path: '/images/taj-mahal.jpg', fallback: '/images/home-hero.jpg' },
  { path: '/images/hawa-mahal.jpg', fallback: '/images/hawamahal.jpg' },
  { path: '/images/humayun-tomb.jpg', fallback: '/images/home-hero.jpg' },
  { path: '/images/qutub-minar.jpg', fallback: '/images/qutubminar1.jpg' },
  { path: '/images/india-gate.jpg', fallback: '/images/indiagate.jpg' },
  { path: '/images/guide1.webp', fallback: '/images/guide.jpg' },
  { path: '/images/guide3.png', fallback: '/images/guide2.jpg' },
  { path: '/images/artifacts1.jpg', fallback: '/images/artifact2.jpg' },
  { path: '/images/artifact3.webp', fallback: '/images/artifact2.jpg' }
];

/**
 * Checks for missing required images and logs warnings
 * @returns {Promise<Array>} - Promise that resolves with the list of missing images
 */
export const checkRequiredImages = async () => {
  const results = await checkAllImages();
  const failedPaths = results.failed.map(f => f.path);
  
  const missingRequired = requiredImages.filter(img => failedPaths.includes(img.path));
  
  if (missingRequired.length > 0) {
    console.warn('Missing required images:', missingRequired.map(m => m.path));
    console.info('Using fallbacks for these images');
  }
  
  return missingRequired;
};

/**
 * Creates a placeholder image for testing
 * @param {string} text - Text to display on the placeholder
 * @returns {string} - Data URL for the placeholder image
 */
export const createPlaceholder = (text = 'Image Placeholder') => {
  // Create canvas for placeholder
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add border
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
  
  // Add text
  ctx.fillStyle = '#666';
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  // Convert to data URL
  return canvas.toDataURL('image/jpeg', 0.7);
};

/**
 * Initializes image checking on page load
 * Can be called from index.js or App.js
 */
export const initializeImageChecking = () => {
  // On page load, check required images and log warnings
  window.addEventListener('DOMContentLoaded', () => {
    checkRequiredImages().then(missingImages => {
      if (missingImages.length > 0) {
        console.log('Image checking complete. Using fallbacks for missing images.');
      } else {
        console.log('Image checking complete. All required images are available.');
      }
    });
  });
};

// Export all functions for easy access
export default {
  checkRequiredImages,
  createPlaceholder,
  initializeImageChecking
}; 