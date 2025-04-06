import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * LazyImage Component
 * A component that handles image loading, fallbacks, and lazy loading
 * 
 * @param {Object} props
 * @param {string} props.src - The source URL of the image
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.fallbackSrc - Fallback image source if the main image fails to load
 * @param {string} props.className - CSS class for the image
 * @param {Object} props.style - Inline styles for the image
 * @param {Function} props.onLoad - Callback when image loads successfully
 * @param {Function} props.onError - Callback when image fails to load
 */
const LazyImage = ({
  src,
  alt,
  fallbackSrc = '/images/home-hero.jpg',
  className = '',
  style = {},
  onLoad,
  onError,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };
  
  const handleErrorInternal = (e) => {
    setIsLoading(false);
    setHasError(true);
    
    // Apply fallback image
    if (fallbackSrc && e.target) {
      e.target.src = fallbackSrc;
    }
    
    if (onError) onError(e);
  };

  return (
    <div className={`lazy-image-container ${className}`} style={{ position: 'relative', ...style }}>
      {isLoading && (
        <div 
          className="lazy-image-loading" 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f5f5',
            color: '#666',
            zIndex: 1
          }}
        >
          <div>Loading...</div>
        </div>
      )}
      
      {hasError && !isLoading && (
        <div 
          className="lazy-image-error" 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8d7da',
            color: '#721c24',
            zIndex: 1,
            fontSize: '0.8rem',
            padding: '10px'
          }}
        >
          <div>Image failed to load</div>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleErrorInternal}
        style={{
          display: isLoading ? 'none' : 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        {...rest}
      />
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

export default LazyImage; 