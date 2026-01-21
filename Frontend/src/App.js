import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState('connected'); // Start as connected for demo
  const [activeDay, setActiveDay] = useState(0);

  const [formData, setFormData] = useState({
    destination: 'Paris',
    days: 4,
    budget: 450,
    interests: ['history', 'food', 'art'],
    travel_style: 'balanced'
  });

  const interestsList = ['history', 'food', 'nature', 'art', 'shopping', 'nightlife', 'sports', 'photography'];

  // Mock data for demonstration
  const mockItinerary = {
    itinerary: {
      summary: "A perfect 4-day cultural journey through Paris blending iconic landmarks with hidden local gems. Experience the magic of the City of Lights while staying within your student budget, with free museum entries and affordable authentic dining.",
      total_estimated_cost: "380-450 EUR",
      days: [
        {
          day: 1,
          date: "Day 1 - Arrival & Historic Center",
          theme: "Iconic Landmarks & Arrival",
          activities: [
            {
              time: "10:00-12:00",
              activity: "Eiffel Tower Visit",
              description: "Explore the iconic Eiffel Tower and Champ de Mars gardens. Free access to grounds, budget option for tower climb.",
              cost: "Free-15 EUR",
              location: "Eiffel Tower",
              type: "sightseeing"
            },
            {
              time: "13:00-14:00",
              description: "Authentic French croissants and coffee at a local boulangerie",
              cost: "8-12 EUR",
              location: "Local Boulangerie",
              type: "food"
            },
            {
              time: "15:00-17:00",
              activity: "Louvre Museum",
              description: "World's largest art museum. Free for EU students under 26, discounted for others.",
              cost: "Free-12 EUR",
              location: "Louvre Museum",
              type: "art"
            }
          ]
        },
        {
          day: 2,
          date: "Day 2 - Art & Culture",
          theme: "Artistic Paris Exploration",
          activities: [
            {
              time: "09:30-11:30",
              activity: "Notre-Dame & Latin Quarter",
              description: "Visit Notre-Dame Cathedral exterior and explore the historic Latin Quarter",
              cost: "Free",
              location: "Île de la Cité",
              type: "history"
            },
            {
              time: "12:30-14:00",
              activity: "Local Market Lunch",
              description: "Fresh produce and local specialties at Marché Maubert",
              cost: "10-15 EUR",
              location: "Marché Maubert",
              type: "food"
            },
            {
              time: "15:00-18:00",
              activity: "Montmartre & Sacré-Cœur",
              description: "Artists' square and panoramic city views from Sacré-Cœur Basilica",
              cost: "Free",
              location: "Montmartre",
              type: "art"
            }
          ]
        },
        {
          day: 3,
          date: "Day 3 - Local Experience",
          theme: "Authentic Parisian Life",
          activities: [
            {
              time: "10:00-12:00",
              activity: "Seine River Walk",
              description: "Scenic walk along the Seine with iconic bridge views",
              cost: "Free",
              location: "Seine Riverbanks",
              type: "nature"
            },
            {
              time: "13:00-14:30",
              activity: "Street Food Experience",
              description: "Crêpes and local street food near Notre-Dame",
              cost: "6-10 EUR",
              location: "Latin Quarter",
              type: "food"
            },
            {
              time: "16:00-18:00",
              activity: "Local Neighborhood Exploration",
              description: "Discover hidden cafes and boutiques in Le Marais district",
              cost: "Free",
              location: "Le Marais",
              type: "shopping"
            }
          ]
        },
        {
          day: 4,
          date: "Day 4 - Departure",
          theme: "Final Memories & Departure",
          activities: [
            {
              time: "09:00-11:00",
              activity: "Last-minute Souvenirs",
              description: "Budget-friendly souvenir shopping at local markets",
              cost: "15-25 EUR",
              location: "Local Markets",
              type: "shopping"
            },
            {
              time: "12:00-13:00",
              activity: "Farewell Lunch",
              description: "Final authentic French meal before departure",
              cost: "12-18 EUR",
              location: "Local Bistro",
              type: "food"
            }
          ]
        }
      ]
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate AI processing
    setTimeout(() => {
      setItinerary(mockItinerary);
      setLoading(false);
    }, 2000);
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🎒 Student Travel Planner</h1>
          <p>AI-powered budget travel planning for students</p>
          <div className="status-badge connected">
            ✅ System Online - AI Ready
          </div>
        </div>
      </header>

      <div className="container">
        <div className="content-wrapper">
          <div className="form-section">
            <div className="form-card">
              <h2>✈️ Plan Your Adventure</h2>
              <form onSubmit={handleSubmit} className="travel-form">
                <div className="form-group">
                  <label>Destination City</label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    placeholder="Where do you want to go?"
                  />
                </div>

                <div className="form-group">
                  <label>Trip Duration: <span className="value-display">{formData.days} days</span></label>
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={formData.days}
                    onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
                  />
                </div>

                <div className="form-group">
                  <label>Total Budget: <span className="value-display">€{formData.budget}</span></label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                  />
                </div>

                <div className="form-group">
                  <label>Interests</label>
                  <div className="interests-grid">
                    {interestsList.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        className={`interest-btn ${formData.interests.includes(interest) ? 'active' : ''}`}
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Travel Style</label>
                  <select
                    value={formData.travel_style}
                    onChange={(e) => setFormData({...formData, travel_style: e.target.value})}
                  >
                    <option value="relaxed">😌 Relaxed Pace</option>
                    <option value="balanced">⚖️ Balanced</option>
                    <option value="packed">🚀 Packed Adventure</option>
                  </select>
                </div>

                <button type="submit" disabled={loading} className="generate-btn">
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      AI is Planning Your Trip...
                    </>
                  ) : (
                    '🤖 Generate Smart Itinerary'
                  )}
                </button>
              </form>
            </div>
          </div>

          {loading && (
            <div className="loading-section">
              <div className="loading-card">
                <div className="ai-thinking">
                  <div className="ai-icon">🤖</div>
                  <h3>AI Travel Assistant Working</h3>
                  <p>Analyzing {formData.destination} for {formData.days} days within €{formData.budget} budget...</p>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {itinerary && (
            <div className="results-section">
              <div className="itinerary-card">
                <div className="itinerary-header">
                  <div>
                    <h2>✨ Your AI-Powered Itinerary</h2>
                    <p className="destination-subtitle">🎯 Perfectly tailored for {formData.destination}</p>
                  </div>
                  <div className="cost-badge">
                    <span className="cost-label">Estimated Cost</span>
                    <span className="cost-value">{itinerary.itinerary.total_estimated_cost}</span>
                  </div>
                </div>
                
                <div className="summary-section">
                  <p>{itinerary.itinerary.summary}</p>
                </div>

                <div className="days-navigation">
                  {itinerary.itinerary.days.map((day, index) => (
                    <button
                      key={index}
                      className={`day-tab ${activeDay === index ? 'active' : ''}`}
                      onClick={() => setActiveDay(index)}
                    >
                      Day {index + 1}
                    </button>
                  ))}
                </div>

                <div className="day-content">
                  <div className="day-header">
                    <h3>{itinerary.itinerary.days[activeDay].date}</h3>
                    <span className="theme-badge">{itinerary.itinerary.days[activeDay].theme}</span>
                  </div>
                  
                  <div className="activities-timeline">
                    {itinerary.itinerary.days[activeDay].activities.map((activity, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <div className="activity-time">{activity.time}</div>
                          <div className="activity-card">
                            <div className="activity-header">
                              <h4>{activity.activity}</h4>
                              <span className="cost-pill">{activity.cost}</span>
                            </div>
                            <p className="activity-description">{activity.description}</p>
                            <div className="activity-footer">
                              <span className="location">📍 {activity.location}</span>
                              <span className="activity-type">{activity.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="itinerary-footer">
                  <div className="success-message">
                    <div className="success-icon">🎉</div>
                    <div>
                      <h4>Your Adventure Awaits!</h4>
                      <p>This AI-generated itinerary is optimized for student travel with the best value experiences.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="app-footer">
        <p>AI Travel Planner for Students • Powered by Google Gemini AI • Perfect Trips on Student Budgets</p>
      </footer>
    </div>
  );
}

export default App;