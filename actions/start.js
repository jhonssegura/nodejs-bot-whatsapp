const axios = require('axios');
const { sendImage, sendButtons, sendLocation, sendText } = require('../actions/response');

const start = (client) => {
  client.onMessage( async (message) => {

    //integracion
    
    if (message.body === 'hola' || message.body === 'Hola') {
      
      // data = JSON.stringify(client)
      // console.log(data);
      sendText( client, message.from ) //respuestas
      // axios.post('http://localhost:3000/api/chat/receive-message', { data })
      // .then(response => console.log('Success:', response))
      // .catch(error => console.error('Error:', error))
    }
    
    if (message.body === 'Ubicacion' || message.body === 'ubicacion') {
      sendLocation( client, message ) //respuestas
    }
    
    if (message.body === 'Opciones' || message.body === 'opciones') {
      sendButtons( client, message ); //respuestas
    }
    if (message.body === 'Imagen' || message.body === 'imagen') {
      sendImage( client, message ) //respuestas
    }
  });
}


module.exports = {
  start,
}