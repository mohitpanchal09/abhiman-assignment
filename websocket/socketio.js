const socketIO = require("socket.io");
let io;  // Declare io globally

// Initialize Socket.io server
const initSocketIO = (server) => {
  io = socketIO(server);

  // Handle new client connection
  io.on("connection", (socket) => {
    console.log("A new client connected:", socket.id);

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  console.log("Socket.io server initialized");
};

// Function to emit events to all clients
const emitToClients = (event, message) => {
  if (io) {
    io.emit(event, message); // Broadcast message to all connected clients
  } else {
    console.error("Socket.io not initialized.");
  }
};

module.exports = { initSocketIO, emitToClients };
