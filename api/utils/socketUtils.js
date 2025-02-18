// Send frame to client through socket
const sendFrameToClient = (socket, frameFilePath) => {
    socket.emit('frame', { imageUrl: `/uploads/frames/${frameFilePath}` });
  };
  
  module.exports = { sendFrameToClient };
  