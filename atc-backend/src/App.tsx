import React, { useEffect, useState } from 'react';
import './App.css';

type Flight = {
  flightId: string;
  position: {
    lat: number;
    lon: number;
  };
  altitude: number;
  speed: number;
  heading: number;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  visibility: number;
};

const App = () => {
  const [flightData, setFlightData] = useState<Flight[]>([]);
  const [error, setError] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connectWebSocket = () => {
    const socket = new WebSocket('ws://localhost:8081');

    socket.onopen = () => {
      console.log('WebSocket connection established');
      setIsConnected(true);
      setError('');
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
      setError('WebSocket connection closed');
      setTimeout(connectWebSocket, 3000);
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
      setError('Error connecting to WebSocket');
      setIsConnected(false);
    };

    // Listen for messages from the WebSocket server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data) && data.length > 0) {
        setFlightData(data);
      } else {
        setError('Error receiving valid flight data');
      }
    };

    return socket;
  };

  useEffect(() => {
    const socket = connectWebSocket();
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Air Traffic Control</h1>
        <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
        <div className="waiting">{isConnected ? ' Waiting for flight data...' : ''}</div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="flight-list">
        {flightData.length === 0 ? (
          <div>No flight data available</div>
        ) : (
          flightData.map((flight) => (
            <div className="flight-card" key={flight.flightId}>
              <h2>Flight {flight.flightId}</h2>
              <p>Latitude: {flight.position.lat}</p>
              <p>Longitude: {flight.position.lon}</p>
              <p>Altitude: {flight.altitude} meters</p>
              <p>Speed: {flight.speed} km/h</p>
              <p>Heading: {flight.heading}°</p>
              <p>Temperature: {flight.temperature}°C</p>
              <p>Wind Speed: {flight.windSpeed} km/h</p>
              <p>Wind Direction: {flight.windDirection}°</p>
              <p>Humidity: {flight.humidity}%</p>
              <p>Visibility: {flight.visibility} km</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
