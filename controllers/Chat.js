const axios = require('axios');
// const { sendImage, sendButtons, sendLocation, sendText } = require('../actions/response');
var client_global  ;

const start = (client) => {
  
  client_global = client;
  client.onMessage( async (message) => {
    console.log("mensaje que llega", message.body);

    //integracion conexion API
    if (message.body === 'hola' || message.body === 'Hola') {
      console.log()
      sendText( client, message.from ) //respuestas
      // axios.post("/url", token, authentication)
    }
    
    // if (message.body === 'Ubicacion' || message.body === 'ubicacion') {
    //   sendLocation( client, message ) //respuestas
    // }
    
    // if (message.body === 'Opciones' || message.body === 'opciones') {
    //   sendButtons( client, message ); //respuestas
    // }
    // if (message.body === 'Imagen' || message.body === 'imagen') {
    //   sendImage( client, message ) //respuestas
    // }
  });
}

const postSendMessage = async( req, res ) => {

  console.log('en el controlador', client_global);
  const { from, text } = req.body;
  
  sendText(client_global, from, text);
  return res.status(200).json({
    status: "ok",
    msg: "mensaje enviado"
  })
}

const postReceiveMessage = async( req, res ) => {
  console.log(req.body);
  return res.status(200).json(req.body)
}

const sendText = async (client, from, text='desde el bot') => {
  console.log('enviando client', client);
  console.log('enviando mensaje', from);
  
  await client
    .sendText(from, `🤖 ${text} `)
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    
    .catch((err) => {
      console.error('Error when sending: ', err); //return object error
    });    
}


module.exports = {
  postSendMessage,
  postReceiveMessage,
  start
}