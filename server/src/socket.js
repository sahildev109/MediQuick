import { Server } from "socket.io";

let io;
const latestLocations = {}; // store latest driver location

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinOrder", (orderId) => {
      socket.join(orderId);
      console.log(`Socket ${socket.id} joined order ${orderId}`);

      // SEND LAST LOCATION IMMEDIATELY
      if (latestLocations[orderId]) {
        socket.emit("receiveLocation", latestLocations[orderId]);
      }
    });

    socket.on("sendLocation", ({ orderId, lat, lng }) => {
      console.log("Location received:", orderId, lat, lng);

      // store latest location
      latestLocations[orderId] = { orderId, lat, lng };

      // broadcast to room
      io.to(orderId).emit("receiveLocation", {
        orderId,
        lat,
        lng,
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

export { io };