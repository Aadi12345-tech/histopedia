/**
 * Utility file for managing monument images and generating paths
 */

// Main monument image paths - maps monument IDs to their image paths
export const monumentImages = {
  // Delhi Monuments
  'red-fort': {
    main: '/desktop/images/redfort.jpg',
    additional: [
      '/desktop/images/redfort2.jpg',
      '/desktop/images/redfort3.jpg',
      '/desktop/images/redfort-aerial.jpg'
    ]
  },
  'humayun-tomb': {
    main: '/desktop/images/humayuntomb.jpg',
    additional: [
      '/desktop/images/humayuntomb2.jpg',
      '/desktop/images/humayuntomb3.jpg',
      '/desktop/images/humayuntomb-gardens.jpg'
    ]
  },
  'qutub-minar': {
    main: '/desktop/images/qutubminar.jpg',
    additional: [
      '/desktop/images/qutubminar2.jpg',
      '/desktop/images/qutubminar3.jpg',
      '/desktop/images/qutubminar-complex.jpg'
    ]
  },
  'india-gate': {
    main: '/desktop/images/indiagate.jpg',
    additional: [
      '/desktop/images/indiagate2.jpg',
      '/desktop/images/indiagate3.jpg',
      '/desktop/images/indiagate-night.jpg'
    ]
  },
  
  // Agra Monuments
  'taj-mahal': {
    main: '/desktop/images/tajmahal.jpg',
    additional: [
      '/desktop/images/tajmahal2.jpg',
      '/desktop/images/tajmahal3.jpg',
      '/desktop/images/tajmahal-garden.jpg'
    ]
  },
  'agra-fort': {
    main: '/desktop/images/agrafort.jpg',
    additional: [
      '/desktop/images/agrafort2.jpg',
      '/desktop/images/agrafort3.jpg',
      '/desktop/images/agrafort-gate.jpg'
    ]
  },
  'fatehpur-sikri': {
    main: '/desktop/images/fatehpursikri.jpg',
    additional: [
      '/desktop/images/fatehpursikri2.jpg',
      '/desktop/images/fatehpursikri3.jpg',
      '/desktop/images/buland-darwaza.jpg'
    ]
  },
  'itimad-ud-daulah': {
    main: '/desktop/images/itimaddaulah.jpg',
    additional: [
      '/desktop/images/itimaddaulah2.jpg',
      '/desktop/images/itimaddaulah3.jpg',
      '/desktop/images/itimaddaulah-interior.jpg'
    ]
  },
  
  // Jaipur Monuments
  'hawa-mahal': {
    main: '/desktop/images/hawamahal.jpg',
    additional: [
      '/desktop/images/hawamahal2.jpg',
      '/desktop/images/hawamahal3.jpg',
      '/desktop/images/hawamahal-windows.jpg'
    ]
  },
  'amber-fort': {
    main: '/desktop/images/amberfort.jpg',
    additional: [
      '/desktop/images/amberfort2.jpg',
      '/desktop/images/amberfort3.jpg',
      '/desktop/images/sheesh-mahal.jpg'
    ]
  },
  'city-palace': {
    main: '/desktop/images/citypalace.jpg',
    additional: [
      '/desktop/images/citypalace2.jpg',
      '/desktop/images/citypalace3.jpg',
      '/desktop/images/citypalace-courtyard.jpg'
    ]
  },
  'jantar-mantar': {
    main: '/desktop/images/jantarmantar.jpg',
    additional: [
      '/desktop/images/jantarmantar2.jpg',
      '/desktop/images/jantarmantar3.jpg',
      '/desktop/images/samrat-yantra.jpg'
    ]
  }
};

/**
 * Get all images for a specific monument
 * @param {string} monumentId - The ID of the monument
 * @returns {Object} Object with main and additional image paths
 */
export const getMonumentImages = (monumentId) => {
  return monumentImages[monumentId] || {
    main: '/images/home-hero.jpg',
    additional: []
  };
};

/**
 * Get the main image for a monument
 * @param {string} monumentId - The ID of the monument
 * @returns {string} Path to the main image
 */
export const getMainImage = (monumentId) => {
  const images = getMonumentImages(monumentId);
  return images.main;
};

/**
 * Get all additional images for a monument
 * @param {string} monumentId - The ID of the monument
 * @returns {Array} Array of additional image paths
 */
export const getAdditionalImages = (monumentId) => {
  const images = getMonumentImages(monumentId);
  return images.additional;
};

/**
 * Get all images for a monument as a flat array
 * @param {string} monumentId - The ID of the monument
 * @returns {Array} Array of all image paths
 */
export const getAllImages = (monumentId) => {
  const images = getMonumentImages(monumentId);
  return [images.main, ...images.additional];
}; 