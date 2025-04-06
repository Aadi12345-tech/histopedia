/**
 * Utility functions for handling images
 */

/**
 * Gets a corrected image URL with public path handling
 * @param {string} imagePath - The image path (e.g., '/images/red-fort.jpg')
 * @returns {string} - The corrected URL
 */
export const getImageUrl = (imagePath) => {
  // If already a full URL, return as is
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  
  // If it starts with a slash, it's from the public folder
  if (imagePath.startsWith('/')) {
    // For production build, adjust for the public URL if needed
    const publicUrl = process.env.PUBLIC_URL || '';
    return `${publicUrl}${imagePath}`;
  }
  
  // Otherwise, assume it's a relative path
  return imagePath;
};

/**
 * Fallback image handler for when an image fails to load
 * @param {Event} event - The error event from the img element
 * @param {string} fallbackImage - Path to fallback image
 */
export const handleImageError = (event, fallbackImage = '/images/home-hero.jpg') => {
  console.log(`Failed to load image: ${event.target.src}`);
  event.target.src = getImageUrl(fallbackImage);
  event.target.onerror = null; // Prevents infinite loops
};

// Function to get image URL with default fallback
export const getTourImageUrl = (imagePath) => {
  // For placeholder or default images
  if (!imagePath || imagePath === '') {
    return '/images/tour-default.jpg';
  }

  // Check if the image path is a full URL
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Check if the image path is a local path
  if (imagePath.startsWith('/')) {
    try {
      // Just return the path and let the browser handle it
      return imagePath;
    } catch (error) {
      console.error(`Error loading image at ${imagePath}:`, error);
      return '/images/tour-default.jpg';
    }
  }

  // Fallback for any other case
  return '/images/tour-default.jpg';
}; 