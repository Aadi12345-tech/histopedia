import React, { useState, useEffect } from 'react';
import { checkAllImages } from '../utils/ImageChecker';
import { getImageUrl } from '../utils/ImageUtils';

const ImageDebugger = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const runCheck = async () => {
      setLoading(true);
      const checkResults = await checkAllImages();
      setResults(checkResults);
      setLoading(false);
    };
    
    runCheck();
  }, []);
  
  const handleRunCheck = async () => {
    setLoading(true);
    const checkResults = await checkAllImages();
    setResults(checkResults);
    setLoading(false);
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Image Debugger</h1>
      <button 
        onClick={handleRunCheck}
        disabled={loading}
        style={{
          padding: '8px 16px',
          background: loading ? '#ccc' : '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Checking...' : 'Run Check'}
      </button>
      
      {results && (
        <div style={{ marginTop: '20px' }}>
          <h2>Results Summary</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '10px',
            marginBottom: '20px'
          }}>
            <div style={{ 
              padding: '15px', 
              background: '#f0f0f0', 
              borderRadius: '4px',
              textAlign: 'center' 
            }}>
              <h3>Total</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{results.total}</div>
            </div>
            <div style={{ 
              padding: '15px', 
              background: '#d4edda', 
              borderRadius: '4px',
              textAlign: 'center' 
            }}>
              <h3>Success</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#155724' }}>
                {results.successful.length}
              </div>
            </div>
            <div style={{ 
              padding: '15px', 
              background: '#f8d7da', 
              borderRadius: '4px',
              textAlign: 'center' 
            }}>
              <h3>Failed</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#721c24' }}>
                {results.failed.length}
              </div>
            </div>
          </div>
          
          {results.failed.length > 0 && (
            <div>
              <h2>Failed Images</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                {results.failed.map((image, index) => (
                  <div key={index} style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ padding: '10px', background: '#f8d7da', color: '#721c24' }}>
                      <div style={{ fontWeight: 'bold', wordBreak: 'break-all' }}>{image.path}</div>
                    </div>
                    <div style={{ 
                      height: '150px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#eee',
                      color: '#666',
                      padding: '10px',
                      textAlign: 'center'
                    }}>
                      Image not found
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <h2 style={{ marginTop: '30px' }}>All Images</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {[...results.successful, ...results.failed]
              .sort((a, b) => a.path.localeCompare(b.path))
              .map((image, index) => (
                <div key={index} style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  overflow: 'hidden',
                  background: image.status === 'success' ? '#fff' : '#f8d7da'
                }}>
                  <div style={{ 
                    padding: '10px', 
                    background: image.status === 'success' ? '#d4edda' : '#f8d7da',
                    color: image.status === 'success' ? '#155724' : '#721c24',
                    fontSize: '12px'
                  }}>
                    <div style={{ fontWeight: 'bold', wordBreak: 'break-all' }}>{image.path}</div>
                  </div>
                  <div style={{ 
                    height: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    background: '#f8f9fa',
                    overflow: 'hidden'
                  }}>
                    {image.status === 'success' ? (
                      <img 
                        src={getImageUrl(image.path)} 
                        alt="Visual preview" 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      <div style={{ color: '#721c24', textAlign: 'center' }}>
                        Image not found
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDebugger; 