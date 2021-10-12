const axios = require('axios');
const { sendImage, sendText, sendFilePDF, sendVoice } = require('../actions/response');
var client_global;

const start = (client) => {
  
  client_global = client;
  client.onMessage( async (message) => {
    console.log("cliente", client);

    //integracion conexion API
    if (message.body === 'hola' || message.body === 'Hola') {
      console.log()
      sendText( client, message.from ) //respuestas
    }
    
    // if (message.body === 'Ubicacion' || message.body === 'ubicacion') {
    //   sendLocation( client, message ) //respuestas
    // }
    
    // if (message.body === 'Opciones' || message.body === 'opciones') {
    //   sendButtons( client, message ); //respuestas
    // }
    if (message.body === 'Imagen' || message.body === 'imagen') {
      sendImage( client, message.from ) //respuestas
    }
  });
}

const postReceiveMessage = async( req, res ) => {
  console.log(req.body);
  return res.status(200).json(req.body)
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

const postSendImage = async( req, res ) => {
  console.log("imagen del body", req.body)
  const { from, image } = req.body

  sendImage(client_global, from, image);
  return res.status(200).json({
    status: "ok",
    msg: "imagen enviada"
  })
}

const postSendFilePDF = async( req, res ) => {

  const { from, file } = req.body;
  
  sendFilePDF(client_global, from, file);
  return res.status(200).json({
    status: "ok",
    msg: "mensaje enviado"
  })
}

const postSendVoice = async( req, res ) => {

  const { from, file } = req.body;
  
  sendVoice(client_global, from, file);
  return res.status(200).json({
    status: "ok",
    msg: "mensaje enviado"
  })
}

module.exports = {
  postReceiveMessage,
  postSendMessage,
  postSendImage,
  postSendFilePDF,
  postSendVoice,
  start
}