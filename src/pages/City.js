import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './City.css';

const City = () => {
  const { cityName } = useParams();

  // City data (in a real app, you would fetch this from an API)
  const cityData = {
    delhi: {
      name: 'Delhi',
      image: 'https://www.holidify.com/images/bgImages/DELHI.jpg',
      description: 'Delhi, India\'s capital territory, is a massive metropolitan area in the country\'s north. Delhi is of great historical significance as an important commercial, transport, and cultural hub, as well as the political center of India.',
      history: 'Delhi has been continuously inhabited since the 6th century BCE. Through most of its history, Delhi has served as a capital of various kingdoms and empires. It has been captured, ransacked and rebuilt several times, particularly during the medieval period, and modern Delhi is a cluster of a number of cities spread across the metropolitan region.',
      monuments: [
        {
          id: 'red-fort',
          name: 'Red Fort',
          image: '/images/red-fort.jpg',
          description: 'The Red Fort is a historic fort in the city of Delhi that served as the main residence of the Mughal Emperors.'
        },
        {
          id: 'qutub-minar',
          name: 'Qutub Minar',
          image: '/images/qutub-minar.jpg',
          description: 'The Qutub Minar is a minaret and victory tower that forms part of the Qutub complex.'
        },
        {
          id: 'india-gate',
          name: 'India Gate',
          image: '/images/india-gate.jpg',
          description: 'The India Gate is a war memorial located astride the Rajpath, on the eastern edge of the ceremonial axis of New Delhi.'
        },
        {
          id: 'humayun-tomb',
          name: 'Humayun\'s Tomb',
          image: '/images/humayun-tomb.jpg',
          description: 'Humayun\'s tomb is the tomb of the Mughal Emperor Humayun in Delhi, India.'
        }
      ]
    },
    agra: {
      name: 'Agra',
      image: 'https://www.holidify.com/images/bgImages/AGRA.jpg',
      description: 'Agra is a city on the banks of the Yamuna river in the Indian state of Uttar Pradesh. It is 206 kilometres south of the national capital New Delhi. Agra is the fourth-most populous city in Uttar Pradesh and 24th in India.',
      history: 'Though Agra\'s history is largely recognized with Mughal Empire, the place was established much before it and has linkages since Mahabharata period. The golden age of the city began with the Mughals. It was known then as Akbarabad and remained the capital of the Mughal Empire under the Emperors Akbar, Jahangir and Shah Jahan.',
      monuments: [
        {
          id: 'taj-mahal',
          name: 'Taj Mahal',
          image: '/images/taj-mahal.jpg',
          description: 'The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra.'
        },
        {
          id: 'agra-fort',
          name: 'Agra Fort',
          image: '/images/agra-fort.jpg',
          description: 'Agra Fort is a historical fort in the city of Agra. It was the main residence of the emperors of the Mughal Dynasty until 1638.'
        },
        {
          id: 'fatehpur-sikri',
          name: 'Fatehpur Sikri',
          image: '/images/fatehpur-sikri.jpg',
          description: 'Fatehpur Sikri is a town in the Agra District of Uttar Pradesh, India. The city itself was founded as the capital of Mughal Empire in 1571 by Emperor Akbar.'
        },
        {
          id: 'itimad-ud-daulah',
          name: 'Itimad-ud-Daulah',
          image: '/images/itimad-ud-daulah.jpg',
          description: 'Tomb of I\'timād-ud-Daulah is a Mughal mausoleum in the city of Agra in the Indian state of Uttar Pradesh. Often described as a "jewel box", it is often regarded as a draft of the Taj Mahal.'
        }
      ]
    },
    jaipur: {
      name: 'Jaipur',
      image: 'https://www.holidify.com/images/bgImages/JAIPUR.jpg',
      description: 'Jaipur is the capital and the largest city of the Indian state of Rajasthan. It was founded on 18 November 1727 by Jai Singh II, the ruler of Amber, and the city today has a population of 3.1 million.',
      history: 'Jaipur was founded in 1727 by Jai Singh II, the Raja of Amber who ruled from 1699 to 1743. He planned to shift his capital from Amber, 11 kilometres (7 mi) to Jaipur to accommodate the growing population and increasing scarcity of water. Jai Singh consulted several books on architecture and architects while planning the layout of Jaipur.',
      monuments: [
        {
          id: 'hawa-mahal',
          name: 'Hawa Mahal',
          image: '/images/hawa-mahal.jpg',
          description: 'The Hawa Mahal is a palace in Jaipur, India. Built from red and pink sandstone, the palace sits on the edge of the City Palace, Jaipur.'
        },
        {
          id: 'amber-fort',
          name: 'Amber Fort',
          image: '/images/amber-fort.jpg',
          description: 'Amer Fort is a fort located in Amer, Rajasthan, India. Amer is a town with an area of 4 square kilometres located 11 kilometres from Jaipur, the capital of Rajasthan.'
        },
        {
          id: 'city-palace',
          name: 'City Palace',
          image: '/images/city-palace.jpg',
          description: 'The City Palace, Jaipur was established at the same time as the city of Jaipur, by Maharaja Sawai Jai Singh II, who moved his court to Jaipur from Amber, in 1727.'
        },
        {
          id: 'jantar-mantar',
          name: 'Jantar Mantar',
          image: '/images/jantar-mantar.jpg',
          description: 'The Jantar Mantar monument in Jaipur, Rajasthan is a collection of nineteen architectural astronomical instruments built by the Rajput king Sawai Jai Singh II.'
        }
      ]
    },
    kolkata: {
      name: 'Kolkata',
      image: 'https://www.holidify.com/images/bgImages/KOLKATA.jpg',
      description: 'Kolkata, formerly known as Calcutta, is the capital of the Indian state of West Bengal. It is the cultural, artistic, and intellectual capital of India and was the former capital of British India until 1911.',
      history: 'Kolkata was founded as a colonial city by the British East India Company in 1698 when they established a trading post in the fishing village of Sutanuti. The city has a rich history as the center of the Indian independence movement and was the epicenter of the Bengal Renaissance, which brought about social, cultural, and intellectual reforms across India. Kolkata served as the capital of British India until 1911 when the capital was relocated to Delhi. The city has been a hub for revolutionary activities, cultural movements, and intellectual discourse throughout India\'s struggle for independence.',
      monuments: [
        {
          id: 'victoriamemorial',
          name: 'Victoria Memorial',
          image: '/images/victoriamemorial.jpg',
          description: 'The Victoria Memorial is a large marble building in Kolkata, built between 1906 and 1921. It is dedicated to the memory of Queen Victoria.'
        },
        {
          id: 'golkonda-fort',
          name: 'Golkonda Fort',
          image: '/images/golcondafort.jpg',
          description: 'Golkonda Fort is a magnificent fortress located in Kolkata, known for its acoustic features, ingenious water supply system, and beautiful palaces.'
        },
        {
          id: 'howrahbridge',
          name: 'Howrah Bridge',
          image: '/images/howrahbridge.jpg',
          description: 'Howrah Bridge is a cantilever bridge over the Hooghly River in Kolkata. It is one of the most iconic landmarks of the city and a symbol of Kolkata.'
        },
        {
          id: 'hussain-sagar',
          name: 'Hussain Sagar',
          image: '/images/hussainsagar.jpg',
          description: 'Hussain Sagar is a heart-shaped lake in Kolkata known for its massive Buddha statue in the middle of the lake, and is a popular recreational spot.'
        }
      ]
    }
  };

  // Get the city data or use a default if not found
  const city = cityData[cityName.toLowerCase()] || {
    name: cityName,
    image: 'https://via.placeholder.com/1200x400?text=City+Image',
    description: 'Information about this city is not available.',
    history: '',
    monuments: []
  };

  return (
    <div className="city-page">
      {/* Hero Section with Background Image */}
      <div className="city-hero" style={{ backgroundImage: `url(${city.image})` }}>
        <div className="city-hero-overlay">
          <div className="city-hero-content">
            <h1 className="city-hero-title">{city.name}</h1>
            <p className="city-hero-description">{city.description}</p>
          </div>
        </div>
      </div>

      {/* City History Section */}
      <div className="city-container">
        <div className="city-history-card">
          <h2 className="section-title">History of {city.name}</h2>
          <p className="city-history-text">{city.history}</p>
        </div>

        {/* Monuments Section */}
        <h2 className="monuments-section-title">Famous Monuments in {city.name}</h2>
        
        <div className="monuments-grid">
          {city.monuments.map((monument) => (
            <Link 
              key={monument.id} 
              to={`/monument/${monument.id}`}
              className="monument-card"
              state={{ backgroundImage: monument.image }}
            >
              <div className="monument-image-container">
                <img
                  src={monument.image}
                  alt={monument.name}
                  className="monument-image"
                />
              </div>
              <div className="monument-content">
                <h3 className="monument-title">{monument.name}</h3>
                <p className="monument-description">{monument.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default City;
