/**
 * Utility to check if images are loading correctly
 */

import { getImageUrl } from './ImageUtils';

// List of all monument images used in the application
const monumentImages = [
  '/images/red-fort.jpg',
  '/images/taj-mahal.jpg',
  '/images/hawa-mahal.jpg',
  '/images/humayun-tomb.jpg',
  '/images/qutub-minar.jpg',
  '/images/india-gate.jpg',
  '/images/redfort.jpg',
  '/images/indiagate.jpg',
  '/images/hawamahal.jpg'
];

// List of all artifact images used in the application
const artifactImages = [
  '/images/artifacts1.jpg',
  '/images/artifact2.jpg',
  '/images/artifact3.webp'
];

// List of guide images used in the application
const guideImages = [
  '/images/guide.jpg',
  '/images/guide1.webp',
  '/images/guide2.jpg',
  '/images/guide3.png'
];

// List of other images used in the application
const otherImages = [
  '/images/home-hero.jpg',
  '/images/location.jpg',
  '/images/ticket.jpg',
  '/images/user.jpg'
];

/**
 * Check if an image is loaded successfully
 * @param {string} imagePath - Path to the image
 * @returns {Promise} - Promise that resolves with the result
 */
export const checkImage = (imagePath) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ path: imagePath, status: 'success' });
    img.onerror = () => resolve({ path: imagePath, status: 'error' });
    img.src = getImageUrl(imagePath);
  });
};

/**
 * Check the status of all images used in the application
 * @returns {Promise} - Promise that resolves with the results
 */
export const checkAllImages = async () => {
  const allImages = [...monumentImages, ...artifactImages, ...guideImages, ...otherImages];
  const results = await Promise.all(allImages.map(checkImage));
  
  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'error');
  
  console.log(`Image check complete: ${successful.length} successful, ${failed.length} failed`);
  
  if (failed.length > 0) {
    console.error('Failed images:', failed.map(f => f.path));
  }
  
  return {
    successful,
    failed,
    total: results.length
  };
};

/**
 * Check specific image categories
 */
export const checkMonumentImages = () => Promise.all(monumentImages.map(checkImage));
export const checkArtifactImages = () => Promise.all(artifactImages.map(checkImage));
export const checkGuideImages = () => Promise.all(guideImages.map(checkImage));
export const checkOtherImages = () => Promise.all(otherImages.map(checkImage));

// Add this to window for easy browser console access
if (typeof window !== 'undefined') {
  window.checkImages = {
    all: checkAllImages,
    monuments: checkMonumentImages,
    artifacts: checkArtifactImages,
    guides: checkGuideImages,
    others: checkOtherImages
  };
} 