import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Excavations.css';

const Excavations = () => {
  const { monumentId } = useParams();
  const { isDarkMode } = useTheme();
  const [selectedExcavation, setSelectedExcavation] = useState(null);

  // Common excavation data to use for all monuments (originally from Red Fort)
  const redFortExcavations = [
    {
      id: 1,
      title: 'Northern Excavation Site',
      year: '1972-1975',
      image: '/images/excavations/excavation1.jpg',
      findings: 'Discovered coins from the Mughal period, pottery, and remains of earlier structures beneath the fort. This excavation revealed significant information about daily life during the Mughal era.',
      leadArchaeologist: 'Dr. S.K. Sharma',
      team: ['Dr. S.K. Sharma', 'Dr. Amita Roy', 'Rajiv Kumar', 'Sunita Devi'],
      artifacts: ['Mughal coins', 'Pottery fragments', 'Metal utensils', 'Jewelry pieces'],
      techniques: ['Stratigraphic excavation', 'Ground penetrating radar', 'Carbon dating']
    },
    {
      id: 2,
      title: 'Eastern Wall Excavation',
      year: '1988-1990',
      image: '/images/excavations/excavation2.jpg',
      findings: 'Unearthed sections of an earlier wall predating the Red Fort, suggesting an older fortification on the site. The discovery points to continuous habitation and strategic importance of the location across multiple historical periods.',
      leadArchaeologist: 'Dr. Rakesh Tewari',
      team: ['Dr. Rakesh Tewari', 'Dr. Meenakshi Jain', 'Alok Sharma', 'Prabha Gupta'],
      artifacts: ['Foundation stones', 'Architectural fragments', 'Military artifacts', 'Construction tools'],
      techniques: ['Horizontal excavation', 'Photogrammetry', 'Dendrochronology']
    }
  ];

  // Excavation data for monuments (in a real app, you would fetch this from an API)
  const excavationsData = {
    'red-fort': redFortExcavations,
    'qutub-minar': redFortExcavations,
    'taj-mahal': redFortExcavations,
    'agra-fort': redFortExcavations,
    'hawa-mahal': redFortExcavations,
    'amber-fort': redFortExcavations,
    'india-gate': redFortExcavations,
    'humayun-tomb': redFortExcavations,
    'fatehpur-sikri': redFortExcavations,
    'itimad-ud-daulah': redFortExcavations,
    'city-palace': redFortExcavations,
    'jantar-mantar': redFortExcavations,
    // Kolkata monuments
    'victoriamemorial': redFortExcavations,
    'golkonda-fort': redFortExcavations,
    'howrahbridge': redFortExcavations,
    'hussain-sagar': redFortExcavations,
    // Using different IDs that might be passed
    'redfort': redFortExcavations,
    'qutubminar': redFortExcavations,
    'tajmahal': redFortExcavations,
    'agrafort': redFortExcavations,
    'hawamahal': redFortExcavations,
    'amberfort': redFortExcavations,
    'indiagate': redFortExcavations,
    'humayunstomb': redFortExcavations,
    'fatehpursikri': redFortExcavations,
    'itimad': redFortExcavations,
    'citypalace': redFortExcavations,
    'jantarmantar': redFortExcavations
  };

  // Default data for unknown monuments
  const defaultData = {
    // ... existing data
  };

  // Get the excavations data for the monument or use default
  const data = excavationsData[monumentId] || defaultData;

  const handleExcavationSelect = (excavation) => {
    setSelectedExcavation(excavation);
  };

  const handleCloseDetails = () => {
    setSelectedExcavation(null);
  };

  return (
    <div className={`excavations-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="excavations-wrapper">
        <div className="excavations-header">
          <h1 className="excavations-title">Archaeological Excavations</h1>
          <p className="excavations-description">
            Explore the archaeological excavations that have revealed the secrets and history of this monument.
            Each excavation provides valuable insights into the past.
          </p>
        </div>
        
        {selectedExcavation ? (
          <div className="excavation-details">
            <button className="close-button" onClick={handleCloseDetails}>
              <svg xmlns="http://www.w3.org/2000/svg" className="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="excavation-detail-header">
              <h2 className="excavation-detail-title">{selectedExcavation.title}</h2>
              <div className="excavation-period">{selectedExcavation.year}</div>
            </div>
            
            <div className="excavation-detail-content">
              <div className="excavation-detail-image-container">
                <img
                  src={selectedExcavation.image}
                  alt={selectedExcavation.title}
                  className="excavation-detail-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Available";
                  }}
                />
              </div>
              
              <div className="excavation-info-box">
                <h3 className="info-title">Findings</h3>
                <p className="info-content">{selectedExcavation.findings}</p>
              </div>
              
              <div className="excavation-info-grid">
                <div className="excavation-info-box">
                  <h3 className="info-title">Excavation Team</h3>
                  <ul className="info-list">
                    {selectedExcavation.team && selectedExcavation.team.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="excavation-info-box">
                  <h3 className="info-title">Discovered Artifacts</h3>
                  <ul className="info-list">
                    {selectedExcavation.artifacts && selectedExcavation.artifacts.map((artifact, index) => (
                      <li key={index}>{artifact}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="excavation-info-box">
                  <h3 className="info-title">Techniques Used</h3>
                  <ul className="info-list">
                    {selectedExcavation.techniques && selectedExcavation.techniques.map((technique, index) => (
                      <li key={index}>{technique}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="excavation-timeline">
            {data.map((excavation, index) => (
              <div 
                key={excavation.id} 
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                onClick={() => handleExcavationSelect(excavation)}
              >
                <div className="timeline-content">
                  <div className="timeline-date">{excavation.year}</div>
                  <div className="timeline-image-container">
                    <img
                      src={excavation.image}
                      alt={excavation.title}
                      className="timeline-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Available";
                      }}
                    />
                  </div>
                  <h2 className="timeline-title">{excavation.title}</h2>
                  <p className="timeline-description">{excavation.findings.substring(0, 100)}...</p>
                  <div className="timeline-leader">
                    <span className="leader-label">Lead:</span> {excavation.leadArchaeologist}
                  </div>
                  <button className="view-details-button">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Excavations; 