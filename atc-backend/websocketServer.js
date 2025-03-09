const express = require('express');
const WebSocket = require('ws');
const app = express();
const { MongoClient } = require('mongodb');
const wss = new WebSocket.Server({ port: 8081 });


//DB connection setup
/*
// MongoDB connection setup
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

async function connectDb() {
  try {
    await client.connect();
    db = client.db('flight_data');  // Database name
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

async function getFlightDataFromDb() {
  try {
    const collection = db.collection('flights');
    const flightData = await collection.find().toArray();
    return flightData;
  } catch (err) {
    console.error('Error fetching data from DB:', err);
    return [];
  }
}
*/

// Dummy
function generateDummyFlightData() {
    const numFlights = 10;  
    const flightData = [];
  
    for (let i = 0; i < numFlights; i++) {
      const flightId = `Flair#${i + 1}`;
      const lat = 30 + Math.random() * 30;
      const lon = -100 + Math.random() * 50;
      const altitude = 10000 + Math.random() * 10000;
      const speed = 500 + Math.random() * 500;
      const heading = Math.random() * 360;
      const temperature = -20 + Math.random() * 60;
      const windSpeed = 0 + Math.random() * 100;
      const windDirection = Math.random() * 360;
      const humidity = 0 + Math.random() * 100;
      const visibility = 0 + Math.random() * 10;
  
      flightData.push({
        flightId,
        position: {
          lat: lat.toFixed(4),
          lon: lon.toFixed(4),
        },
        altitude: altitude.toFixed(2),
        speed: speed.toFixed(2),
        heading: heading.toFixed(2),
        temperature: temperature.toFixed(2),
        windSpeed: windSpeed.toFixed(2),
        windDirection: windDirection.toFixed(2),
        humidity: humidity.toFixed(2),
        visibility: visibility.toFixed(2),
      });
    }
  
    return flightData;
  }
  
//Comment out this whole stuff when our DB is complete

function broadcastData(flightData) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(flightData)); 
    }
  });
}


wss.on('connection', (ws) => {
  console.log('New client connected');

//Replace generateDummyFlightData with intialFlightData
  const initialFlightData = generateDummyFlightData();
  console.log('Sending initial flight data to client');
  ws.send(JSON.stringify(initialFlightData));

//Replace generateDummyFlightData with updatedFlightData
  const interval = setInterval(() => {
    const updatedFlightData = generateDummyFlightData();
    console.log('Sending updated flight data to all clients');
    broadcastData(updatedFlightData);
  }, 5000); 
   // Update every 5 seconds

  ws.on('message', (message) => {
    console.log('Received message from client:', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval)
  });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
