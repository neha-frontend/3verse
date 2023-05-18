import { io } from 'socket.io-client';

const baseURL = process.env.REACT_APP_SOCKET_URL
function socketConfig(id) {
  const socket = io(baseURL, {  
    rejectUnauthorized: false
  });  
  socket.on('connect', () => {      
    socket.emit('join', { userId: id });
  });

  return socket;
}

export default socketConfig;
