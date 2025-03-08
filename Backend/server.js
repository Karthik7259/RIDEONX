import http from 'http';
import app from './app.js';
import { initializeSocket } from './socket.js';
import Razorpay from 'razorpay'



const port = process.env.PORT || 3000;
const server = http.createServer(app);

initializeSocket(server);


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
