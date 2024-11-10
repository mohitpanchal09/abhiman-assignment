const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const db = require('./db/db');
const routes = require('./routes/index.routes')
const createTopics = require('./kafka/topics')
const consumeVotes = require('./kafka/consumer');
const { initSocketIO } = require('./websocket/socketio'); 
require('dotenv').config();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Call createTopics when the application starts to ensure topics are created in Kafka
createTopics()
  .then(() => {
    console.log('Kafka topics created or already exist');
  })
  .catch(console.error);

// Call the consumer function to start consuming votes from Kafka
consumeVotes().catch(console.error);

// WebSocket Server Setup
const server = require('http').createServer(app); // Use the same HTTP server for WebSocket
initSocketIO(server); // Initialize Socket.io

app.use(routes)


// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});