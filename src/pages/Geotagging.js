import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Geotagging.css';

const Geotagging = () => {
  const { id } = useParams();
  const [monument, setMonument] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  // Format ID to Title Case
  const formatIdToTitle = (id) => {
    if (!id) return "Monument";
    
    // Handle camelCase by adding spaces before capital letters
    const withSpaces = id.replace(/([A-Z])/g, ' $1');
    
    // Capitalize first letter and return
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

  useEffect(() => {
    // Simulating API call to get monument data
    setLoading(true);
    
    // Monument data based on ID
    const getMonumentData = () => {
      // Default coordinates map
      const coordinatesMap = {
        // Delhi monuments
        'redfort': {
          name: 'Red Fort',
          city: 'Delhi',
          coordinates: {
            latitude: "28.6562° N",
            longitude: "77.2410° E",
            decimal: {
              lat: 28.6562,
              lng: 77.2410
            }
          },
          elevation: "234 meters above sea level"
        },
        'qutubminar': {
          name: 'Qutub Minar',
          city: 'Delhi',
          coordinates: {
            latitude: "28.5245° N",
            longitude: "77.1855° E",
            decimal: {
              lat: 28.5245,
              lng: 77.1855
            }
          },
          elevation: "217 meters above sea level"
        },
        'indiagate': {
          name: 'India Gate',
          city: 'Delhi',
          coordinates: {
            latitude: "28.6129° N",
            longitude: "77.2295° E",
            decimal: {
              lat: 28.6129,
              lng: 77.2295
            }
          },
          elevation: "223 meters above sea level"
        },
        'humayunstomb': {
          name: 'Humayun\'s Tomb',
          city: 'Delhi',
          coordinates: {
            latitude: "28.5933° N",
            longitude: "77.2507° E",
            decimal: {
              lat: 28.5933,
              lng: 77.2507
            }
          },
          elevation: "225 meters above sea level"
        },
        // Agra monuments
        'tajmahal': {
          name: 'Taj Mahal',
          city: 'Agra',
          coordinates: {
            latitude: "27.1751° N",
            longitude: "78.0421° E",
            decimal: {
              lat: 27.1751,
              lng: 78.0421
            }
          },
          elevation: "171 meters above sea level"
        },
        'agrafort': {
          name: 'Agra Fort',
          city: 'Agra',
          coordinates: {
            latitude: "27.1800° N",
            longitude: "78.0215° E",
            decimal: {
              lat: 27.1800,
              lng: 78.0215
            }
          },
          elevation: "168 meters above sea level"
        },
        'fatehpursikri': {
          name: 'Fatehpur Sikri',
          city: 'Agra',
          coordinates: {
            latitude: "27.0940° N",
            longitude: "77.6696° E",
            decimal: {
              lat: 27.0940,
              lng: 77.6696
            }
          },
          elevation: "187 meters above sea level"
        },
        'itimad': {
          name: 'Itimad-ud-Daulah',
          city: 'Agra',
          coordinates: {
            latitude: "27.1927° N",
            longitude: "78.0307° E",
            decimal: {
              lat: 27.1927,
              lng: 78.0307
            }
          },
          elevation: "173 meters above sea level"
        },
        // Jaipur monuments
        'hawamahal': {
          name: 'Hawa Mahal',
          city: 'Jaipur',
          coordinates: {
            latitude: "26.9239° N",
            longitude: "75.8267° E",
            decimal: {
              lat: 26.9239,
              lng: 75.8267
            }
          },
          elevation: "433 meters above sea level"
        },
        'amberfort': {
          name: 'Amber Fort',
          city: 'Jaipur',
          coordinates: {
            latitude: "26.9855° N",
            longitude: "75.8513° E",
            decimal: {
              lat: 26.9855,
              lng: 75.8513
            }
          },
          elevation: "452 meters above sea level"
        },
        'citypalace': {
          name: 'City Palace',
          city: 'Jaipur',
          coordinates: {
            latitude: "26.9258° N",
            longitude: "75.8237° E",
            decimal: {
              lat: 26.9258,
              lng: 75.8237
            }
          },
          elevation: "435 meters above sea level"
        },
        'jantarmantar': {
          name: 'Jantar Mantar',
          city: 'Jaipur',
          coordinates: {
            latitude: "26.9246° N",
            longitude: "75.8242° E",
            decimal: {
              lat: 26.9246,
              lng: 75.8242
            }
          },
          elevation: "431 meters above sea level"
        },
        // Kolkata monuments
        'victoriamemorial': {
          name: 'Victoria Memorial',
          city: 'Kolkata',
          coordinates: {
            latitude: "22.5448° N",
            longitude: "88.3426° E",
            decimal: {
              lat: 22.5448,
              lng: 88.3426
            }
          },
          elevation: "11 meters above sea level"
        },
        'golkondafort': {
          name: 'Golkonda Fort',
          city: 'Kolkata',
          coordinates: {
            latitude: "22.5687° N",
            longitude: "88.3698° E",
            decimal: {
              lat: 22.5687,
              lng: 88.3698
            }
          },
          elevation: "15 meters above sea level"
        },
        'howrahbridge': {
          name: 'Howrah Bridge',
          city: 'Kolkata',
          coordinates: {
            latitude: "22.5851° N",
            longitude: "88.3468° E",
            decimal: {
              lat: 22.5851,
              lng: 88.3468
            }
          },
          elevation: "7 meters above sea level"
        },
        'hussainsagar': {
          name: 'Hussain Sagar',
          city: 'Kolkata',
          coordinates: {
            latitude: "22.5726° N",
            longitude: "88.3639° E",
            decimal: {
              lat: 22.5726,
              lng: 88.3639
            }
          },
          elevation: "8 meters above sea level"
        }
      };

      // If coordinates exist for this monument, use them
      const monumentInfo = coordinatesMap[id];
      if (monumentInfo) {
        return {
          id: id,
          name: monumentInfo.name,
          city: monumentInfo.city,
          coordinates: monumentInfo.coordinates,
          elevation: monumentInfo.elevation,
          climate: {
            type: monumentInfo.city === 'Delhi' ? "Humid Subtropical Climate" :
                  monumentInfo.city === 'Agra' ? "Semi-arid Climate" :
                  "Hot Semi-arid Climate",
            averageTemperature: {
              annual: monumentInfo.city === 'Delhi' ? "25.3°C" :
                     monumentInfo.city === 'Agra' ? "26.7°C" :
                     "25.1°C",
              summer: monumentInfo.city === 'Delhi' ? "33-45°C" :
                     monumentInfo.city === 'Agra' ? "32-48°C" :
                     "30-45°C",
              winter: monumentInfo.city === 'Delhi' ? "5-25°C" :
                     monumentInfo.city === 'Agra' ? "4-25°C" :
                     "8-24°C"
            },
            rainfall: {
              annual: monumentInfo.city === 'Delhi' ? "797 mm" :
                     monumentInfo.city === 'Agra' ? "687 mm" :
                     "650 mm",
              rainyMonths: "July to September"
            },
            humidity: {
              annual: monumentInfo.city === 'Delhi' ? "62%" :
                     monumentInfo.city === 'Agra' ? "55%" :
                     "45%",
              summer: monumentInfo.city === 'Delhi' ? "45-60%" :
                     monumentInfo.city === 'Agra' ? "25-50%" :
                     "25-40%",
              winter: monumentInfo.city === 'Delhi' ? "70-90%" :
                     monumentInfo.city === 'Agra' ? "60-80%" :
                     "50-65%"
            }
          },
          nearbyPlaces: [
            {
              name: monumentInfo.city === 'Delhi' ? "Local Markets" :
                   monumentInfo.city === 'Agra' ? "Mehtab Bagh" :
                   monumentInfo.city === 'Jaipur' ? "Johri Bazaar" :
                   monumentInfo.city === 'Kolkata' ? "Park Street" :
                   "Local Market",
              distance: "1.2 km",
              type: "Shopping"
            },
            {
              name: monumentInfo.city === 'Delhi' ? "India Gate" :
                   monumentInfo.city === 'Agra' ? "Agra Fort" :
                   monumentInfo.city === 'Jaipur' ? "City Palace" :
                   monumentInfo.city === 'Kolkata' ? "Howrah Bridge" :
                   "Nearby Attraction",
              distance: "3.5 km",
              type: monumentInfo.city === 'Delhi' ? "Monument" :
                    monumentInfo.city === 'Agra' ? "Historical Site" :
                    monumentInfo.city === 'Jaipur' ? "Palace" :
                    monumentInfo.city === 'Kolkata' ? "Landmark" :
                    "Point of Interest"
            },
            {
              name: monumentInfo.city === 'Delhi' ? "Lodhi Gardens" :
                   monumentInfo.city === 'Agra' ? "Taj Nature Walk" :
                   monumentInfo.city === 'Jaipur' ? "Nahargarh Fort" :
                   monumentInfo.city === 'Kolkata' ? "Maidan" :
                   "Recreational Area",
              distance: "2.8 km",
              type: "Recreation"
            }
          ]
        };
      }

      // Get formatted monument name
      const monumentName = formatIdToTitle(id);
      
      // Determine city based on ID
      let city = '';
      if (id) {
        if (id.includes('agra') || id.includes('taj') || id.includes('fatehpur') || id.includes('itimad')) {
          city = 'Agra';
        } else if (id.includes('jaipur') || id.includes('amber') || id.includes('hawa') || id.includes('jantar')) {
          city = 'Jaipur';
        } else if (id.includes('delhi') || id.includes('redfort') || id.includes('qutub') || id.includes('indiagate') || id.includes('humayun')) {
          city = 'Delhi';
        } else if (id.includes('kolkata') || id.includes('victoria') || id.includes('golkonda') || id.includes('howrah') || id.includes('hussain')) {
          city = 'Kolkata';
        } else {
          // Try to extract city name from ID
          const possibleCities = ['Delhi', 'Agra', 'Jaipur', 'Kolkata'];
          
          // Check if any part of the ID matches a known city
          const cityFromId = possibleCities.find(cityName => 
            id.toLowerCase().includes(cityName.toLowerCase())
          );
          
          // If found, use that city, otherwise use "Unknown City"
          city = cityFromId || monumentName.split(' ')[0] || "Historical City";
        }
      }

      // If no specific data, return default with formatted name
      return {
        id: id || 'unknown',
        name: monumentName,
        city: city,
        coordinates: {
          latitude: city === 'Delhi' ? "28.6129° N" :
                  city === 'Agra' ? "27.1751° N" :
                  city === 'Jaipur' ? "26.9255° N" :
                  city === 'Kolkata' ? "22.5726° N" :
                  "N/A",
          longitude: city === 'Delhi' ? "77.2295° E" :
                   city === 'Agra' ? "78.0421° E" :
                   city === 'Jaipur' ? "75.8236° E" :
                   city === 'Kolkata' ? "88.3639° E" :
                   "N/A",
          decimal: {
            lat: city === 'Delhi' ? 28.6129 :
                 city === 'Agra' ? 27.1751 :
                 city === 'Jaipur' ? 26.9255 :
                 city === 'Kolkata' ? 22.5726 :
                 28.6129,
            lng: city === 'Delhi' ? 77.2295 :
                 city === 'Agra' ? 78.0421 :
                 city === 'Jaipur' ? 75.8236 :
                 city === 'Kolkata' ? 88.3639 :
                 77.2295
          }
        },
        elevation: city === 'Delhi' ? "220 meters above sea level" :
                  city === 'Agra' ? "170 meters above sea level" :
                  city === 'Jaipur' ? "430 meters above sea level" :
                  city === 'Kolkata' ? "9 meters above sea level" :
                  "Varies by location",
        climate: {
          type: city === 'Delhi' ? "Humid Subtropical Climate" :
                city === 'Agra' ? "Semi-arid Climate" :
                city === 'Jaipur' ? "Hot Semi-arid Climate" :
                city === 'Kolkata' ? "Tropical Wet-and-Dry Climate" :
                "Regional Climate",
          averageTemperature: {
            annual: city === 'Delhi' ? "25.3°C" :
                   city === 'Agra' ? "26.7°C" :
                   city === 'Jaipur' ? "25.1°C" :
                   city === 'Kolkata' ? "26.8°C" :
                   "Varies by season",
            summer: city === 'Delhi' ? "33-45°C" :
                   city === 'Agra' ? "32-48°C" :
                   city === 'Jaipur' ? "30-45°C" :
                   city === 'Kolkata' ? "30-40°C" :
                   "Hot",
            winter: city === 'Delhi' ? "5-25°C" :
                   city === 'Agra' ? "4-25°C" :
                   city === 'Jaipur' ? "8-24°C" :
                   city === 'Kolkata' ? "12-28°C" :
                   "Mild to cool"
          },
          rainfall: {
            annual: city === 'Delhi' ? "797 mm" :
                   city === 'Agra' ? "687 mm" :
                   city === 'Jaipur' ? "650 mm" :
                   city === 'Kolkata' ? "1582 mm" :
                   "Seasonal",
            rainyMonths: "July to September"
          },
          humidity: {
            annual: city === 'Delhi' ? "62%" :
                   city === 'Agra' ? "55%" :
                   city === 'Jaipur' ? "45%" :
                   city === 'Kolkata' ? "70%" :
                   "Varies by season",
            summer: city === 'Delhi' ? "45-60%" :
                   city === 'Agra' ? "25-50%" :
                   city === 'Jaipur' ? "25-40%" :
                   city === 'Kolkata' ? "70-80%" :
                   "Moderate to high",
            winter: city === 'Delhi' ? "70-90%" :
                   city === 'Agra' ? "60-80%" :
                   city === 'Jaipur' ? "50-65%" :
                   city === 'Kolkata' ? "50-70%" :
                   "Moderate"
          }
        },
        nearbyPlaces: [
          {
            name: city === 'Delhi' ? "Local Markets" :
                 city === 'Agra' ? "Mehtab Bagh" :
                 city === 'Jaipur' ? "Johri Bazaar" :
                 city === 'Kolkata' ? "Park Street" :
                 "Local Market",
            distance: "1.2 km",
            type: "Shopping"
          },
          {
            name: city === 'Delhi' ? "India Gate" :
                 city === 'Agra' ? "Agra Fort" :
                 city === 'Jaipur' ? "City Palace" :
                 city === 'Kolkata' ? "Howrah Bridge" :
                 "Nearby Attraction",
            distance: "3.5 km",
            type: city === 'Delhi' ? "Monument" :
                  city === 'Agra' ? "Historical Site" :
                  city === 'Jaipur' ? "Palace" :
                  city === 'Kolkata' ? "Landmark" :
                  "Point of Interest"
          },
          {
            name: city === 'Delhi' ? "Lodhi Gardens" :
                 city === 'Agra' ? "Taj Nature Walk" :
                 city === 'Jaipur' ? "Nahargarh Fort" :
                 city === 'Kolkata' ? "Maidan" :
                 "Recreational Area",
            distance: "2.8 km",
            type: "Recreation"
          }
        ]
      };
    };

    const monumentData = getMonumentData();

    setTimeout(() => {
      setMonument(monumentData);
      setLoading(false);
    }, 800);
  }, [id]); // Only depend on id

  if (loading) {
    return (
      <div className={`geotagging-page ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <div className="geotagging-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading geographical information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`geotagging-page ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="geotagging-container">
        <div className="geotagging-header">
          <h1>{monument.name}</h1>
          <p>Discover the monument's exact coordinates, climate and surrounding details.</p>
        </div>

        <div className="geotagging-content">
          <div className="map-section">
            <h2>Location Map</h2>
            <div className="map-container">
              <iframe
                title={`${monument.name} Map`}
                src={`https://maps.google.com/maps?q=${monument.coordinates.decimal.lat},${monument.coordinates.decimal.lng}&z=15&output=embed`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="geotagging-info">
            <h2>Geographical Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <h3>Coordinates</h3>
                <div className="coordinates-box">
                  <p><span>Latitude:</span> {monument.coordinates.latitude}</p>
                  <p><span>Longitude:</span> {monument.coordinates.longitude}</p>
                  <p><span>Elevation:</span> {monument.elevation}</p>
                </div>
              </div>

              <div className="info-item">
                <h3>Climate Data</h3>
                <div className="climate-box">
                  <p><span>Climate Type:</span> {monument.climate.type}</p>
                  <p><span>Annual Average Temperature:</span> {monument.climate.averageTemperature.annual}</p>
                  <p><span>Summer Temperature Range:</span> {monument.climate.averageTemperature.summer}</p>
                  <p><span>Winter Temperature Range:</span> {monument.climate.averageTemperature.winter}</p>
                  <p><span>Annual Rainfall:</span> {monument.climate.rainfall.annual}</p>
                  <p><span>Rainy Season:</span> {monument.climate.rainfall.rainyMonths}</p>
                  <p><span>Average Humidity:</span> {monument.climate.humidity.annual}</p>
                </div>
              </div>
            </div>

            <div className="nearby-places">
              <h3>Nearby Places of Interest</h3>
              <div className="nearby-places-grid">
                {monument.nearbyPlaces.map((place, index) => (
                  <div className="nearby-place" key={index}>
                    <p className="nearby-place-name">{place.name}</p>
                    <p className="nearby-place-distance">{place.distance}</p>
                    <p className="nearby-place-type">{place.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="geotagging-footer">
          <Link to={`/monument/${id}`} className="back-to-monument">
            Return to {monument.name} Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Geotagging; 