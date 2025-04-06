import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    facts: [''],
    attractions: ['']
  });
  
  // Placeholder data for demonstration
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setCities([
        {
          id: 1,
          name: 'Delhi',
          description: 'The capital city of India',
          image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
          facts: ['Founded in 1911', 'Population: 20 million'],
          attractions: ['India Gate', 'Red Fort', 'Qutub Minar']
        },
        {
          id: 2,
          name: 'Mumbai',
          description: 'Financial capital of India',
          image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c',
          facts: ['Formerly known as Bombay', 'Population: 18 million'],
          attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Logout handler
  const handleLogout = () => {
    setAuthenticated(false);
  };

  // Show add form
  const handleAddNew = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      facts: [''],
      attractions: ['']
    });
    setEditingCity(null);
    setShowForm(true);
  };

  // Show edit form
  const handleEdit = (city) => {
    setFormData({
      name: city.name,
      description: city.description,
      image: city.image,
      facts: [...city.facts],
      attractions: [...city.attractions]
    });
    setEditingCity(city.id);
    setShowForm(true);
  };

  // Delete city
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      setCities(cities.filter(city => city.id !== id));
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle array inputs (facts and attractions)
  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  // Add new item to an array field
  const handleAddItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  // Remove item from an array field
  const handleRemoveItem = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newCity = {
      ...formData,
      id: editingCity || Date.now()
    };
    
    if (editingCity) {
      setCities(cities.map(city => city.id === editingCity ? newCity : city));
    } else {
      setCities([...cities, newCity]);
    }
    
    setShowForm(false);
  };

  if (!authenticated) {
    return <Navigate to="/admin-login" />;
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Histopedia Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          <span className="icon">🚪</span> Logout
        </button>
      </header>

      <main className="admin-content">
        {!showForm ? (
          <div className="cities-management">
            <div className="section-header">
              <h2 className="section-title">Manage Cities</h2>
              <button className="add-button" onClick={handleAddNew}>
                <span className="icon">➕</span> Add New City
              </button>
            </div>

            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <div className="cities-table-container">
                <table className="cities-table">
                  <thead>
                    <tr>
                      <th>City</th>
                      <th>Description</th>
                      <th>Facts</th>
                      <th>Attractions</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cities.map(city => (
                      <tr key={city.id}>
                        <td className="city-name-cell">
                          <img src={city.image} alt={city.name} className="city-thumbnail" />
                          <span>{city.name}</span>
                        </td>
                        <td>{city.description}</td>
                        <td>
                          <ul className="item-list">
                            {city.facts.map((fact, idx) => (
                              <li key={idx}>{fact}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul className="item-list">
                            {city.attractions.map((attraction, idx) => (
                              <li key={idx}>{attraction}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="actions-cell">
                          <button className="edit-button" onClick={() => handleEdit(city)}>
                            <span className="icon">✏️</span>
                          </button>
                          <button className="delete-button" onClick={() => handleDelete(city.id)}>
                            <span className="icon">🗑️</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="city-form-container">
            <div className="section-header">
              <h2 className="section-title">
                {editingCity ? 'Edit City' : 'Add New City'}
              </h2>
              <button className="back-button" onClick={() => setShowForm(false)}>
                <span className="icon">⬅️</span> Back to List
              </button>
            </div>

            <form className="city-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">City Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Facts</label>
                {formData.facts.map((fact, index) => (
                  <div key={index} className="array-input-row">
                    <input
                      type="text"
                      value={fact}
                      onChange={(e) => handleArrayChange(index, 'facts', e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="remove-item-button"
                      onClick={() => handleRemoveItem(index, 'facts')}
                      disabled={formData.facts.length <= 1}
                    >
                      <span className="icon">✖️</span>
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="add-item-button"
                  onClick={() => handleAddItem('facts')}
                >
                  <span className="icon">➕</span> Add Fact
                </button>
              </div>

              <div className="form-group">
                <label>Attractions</label>
                {formData.attractions.map((attraction, index) => (
                  <div key={index} className="array-input-row">
                    <input
                      type="text"
                      value={attraction}
                      onChange={(e) => handleArrayChange(index, 'attractions', e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="remove-item-button"
                      onClick={() => handleRemoveItem(index, 'attractions')}
                      disabled={formData.attractions.length <= 1}
                    >
                      <span className="icon">✖️</span>
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="add-item-button"
                  onClick={() => handleAddItem('attractions')}
                >
                  <span className="icon">➕</span> Add Attraction
                </button>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  {editingCity ? 'Update City' : 'Add City'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <footer className="admin-footer">
        <p>© 2023 Histopedia Admin Console</p>
      </footer>
    </div>
  );
};

export default Admin; 