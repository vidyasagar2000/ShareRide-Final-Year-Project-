import io from 'socket.io-client'

const socket = io('http://localhost:3000');
// https://share-ride-s8da.onrender.com
// const socket = io('https://share-ride-s8da.onrender.com');
export default socket;