import io from "socket.io-client"; // Add this

let socket;

const connectSocket = (user_id, token) => {
  console.log(token);
  socket = io("http://localhost:4800/", {
    query: { user_id },
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}; // Add this -- our server will run on port 4000, so we connect to it from here

export {socket, connectSocket};
