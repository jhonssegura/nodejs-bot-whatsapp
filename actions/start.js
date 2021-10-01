const axios = require('axios');
const { sendImage, sendButtons, sendLocation, sendText, sendFilePDF, sendContact, sendContactList, sendVoice, sendVideo} = require('../actions/response');

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
    if (message.body === 'PDF' || message.body === 'pdf') {
      sendFilePDF( client, message );
    }
    if (message.body === 'Contacto' || message.body === 'contacto') {
      sendContact( client, message );
    }
    if (message.body === 'Lista Contactos' || message.body === 'lista contactos') {
      sendContactList( client, message );
    }
    if (message.body === 'Audio' || message.body === 'audio') {
      sendVoice( client, message );
    }
    if (message.body === 'Video' || message.body === 'video') {
      sendVideo( client, message );
    }
  });
}


module.exports = {
  start,
}