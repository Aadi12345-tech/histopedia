import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Artifacts.css';

const Artifacts = () => {
  const { monumentId } = useParams();
  const [artifacts, setArtifacts] = useState([]);
  const [activeArtifact, setActiveArtifact] = useState(null);

  // Simulated data fetch - in a real application, this would come from a backend API
  useEffect(() => {
    // This is placeholder data that would normally come from an API
    const fetchedArtifacts = [
      {
        id: 1,
        name: "Peacock Throne",
        image: "/images/peacockthrone.jpeg",
        period: "17th Century",
        description: "The Peacock Throne was a famous jeweled throne that was the seat of the Mughal emperors of India. It was commissioned in the early 17th century by Emperor Shah Jahan and was one of the most opulent pieces of royal furniture ever created. The throne was said to be adorned with rubies, emeralds, pearls, and diamonds, including the famous Koh-i-Noor diamond.",
        significance: "The Peacock Throne symbolized the wealth and power of the Mughal Empire at its height. It was looted by Persian invader Nader Shah in 1739 and subsequently disappeared, becoming a legendary artifact of India's royal history."
      },
      {
        id: 2,
        name: "Ashoka Pillar",
        image: "/images/ashokapillar.jpg",
        period: "3rd Century BCE",
        description: "The Ashoka Pillars are a series of columns dispersed throughout the Indian subcontinent, erected by Emperor Ashoka during his reign in the 3rd century BCE. These pillars are notable for their polished stone craftsmanship, monolithic construction, and inscriptions that represent some of the oldest deciphered original texts of India.",
        significance: "The pillars and their inscriptions represent the earliest surviving examples of Indian stone sculpture and ancient Indian political history. The lion capital from one of these pillars was adopted as the national emblem of India after independence."
      },
      {
        id: 3,
        name: "Khajuraho Sculptures",
        image: "/images/khajurahosculptures.webp",
        period: "10th-11th Century",
        description: "The Khajuraho temples are a group of Hindu and Jain temples in Madhya Pradesh, known for their nagara-style architectural symbolism and their erotic sculptures. Built by the Chandela dynasty between 950 and 1050 CE, these temples showcase the rich artistic heritage of medieval India.",
        significance: "These sculptures are considered among the greatest masterpieces of Indian art and architecture. They depict the Indo-Aryan architecture and represent the celebration of love, life, and worship in Hindu tradition."
      },
      {
        id: 4,
        name: "Dancing Girl of Mohenjo-daro",
        image: "/images/dancinggirlmohenjodaro.jpg",
        period: "2500 BCE",
        description: "The Dancing Girl is a 4,500-year-old bronze statuette discovered at the archaeological site of Mohenjo-daro in the Indus Valley Civilization. The figurine depicts a young woman in a dancing pose, wearing bangles and a necklace, with her hand on her hip.",
        significance: "This artifact is one of the most recognized relics of the ancient Indus Valley Civilization. It provides insights into the metallurgical skills, fashion, and possibly the dance forms of one of the world's earliest urban civilizations."
      }
    ];
    
    setArtifacts(fetchedArtifacts);
  }, [monumentId]);

  // Add font links to document head
  useEffect(() => {
    const playfairLink = document.createElement('link');
    playfairLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap';
    playfairLink.rel = 'stylesheet';
    
    const poppinsLink = document.createElement('link');
    poppinsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    poppinsLink.rel = 'stylesheet';
    
    document.head.appendChild(playfairLink);
    document.head.appendChild(poppinsLink);
    
    return () => {
      document.head.removeChild(playfairLink);
      document.head.removeChild(poppinsLink);
    };
  }, []);

  const toggleActive = (artifactId) => {
    if (activeArtifact === artifactId) {
      setActiveArtifact(null);
    } else {
      setActiveArtifact(artifactId);
    }
  };

  return (
    <div className="artifacts-container">
      <div className="artifacts-wrapper">
        <div className="artifacts-header">
          <h1 className="monument-title">
            Historical Artifacts
            <span>Treasures from Our Heritage</span>
          </h1>
          <p className="monument-description">
            Explore a collection of significant artifacts from India's rich historical past. Each item tells a story of craftsmanship, culture, and historical context that shaped the nation's heritage.
          </p>
        </div>
        
        <div className="artifacts-content">
          <div className="artifacts-grid">
            {artifacts.map((artifact, index) => (
              <div 
                key={artifact.id}
                className="artifact-card"
                onClick={() => toggleActive(artifact.id)}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="artifact-image-container">
                  <img 
                    src={process.env.PUBLIC_URL + artifact.image} 
                    alt={artifact.name} 
                    className="artifact-image"
                  />
                  <div className="artifact-period-badge">{artifact.period}</div>
                </div>
                
                <div className="artifact-content">
                  <h2 className="artifact-name">{artifact.name}</h2>
                  
                  <div className="artifact-section">
                    <div className="artifact-subsection">
                      <h3 className="info-title">Description</h3>
                      <div className="info-text">
                        {artifact.description}
                      </div>
                    </div>
                    
                    <div className="artifact-subsection">
                      <h3 className="info-title">Historical Significance</h3>
                      <div className="info-text">
                        {artifact.significance}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artifacts; 