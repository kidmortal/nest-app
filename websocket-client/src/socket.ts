import { Socket, io } from 'socket.io-client';

export let socket: Socket | undefined = undefined;

if (!socket) {
  socket = io('http://localhost:8000');
  socket.on('connect', () => {
    console.log('socket connected'); // true
  });
}
