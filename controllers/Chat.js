const axios = require('axios');
const { sendImage, sendText, sendFilePDF, sendVoice, sendVideo, sendLocation, sendContact, sendContactList } = require('../actions/response');
var client_global;

const start = (client) => {
  
  client_global = client;

  client.onMessage( async (message) => {

    // Validaciones respuestas cuando escriben al Bot

    if (message.body === 'Hola' || message.body === 'hola') {
      sendText( client, message.from ) 
    }
    if (message.body === 'Imagen' || message.body === 'imagen') {
      sendImage( client, message.from ) 
    }
    if (message.body === 'PDF' || message.body === 'pdf') {
      sendFilePDF( client, message.from );
    }
    if (message.body === 'Audio' || message.body === 'audio') {
      sendVoice( client, message.from );
    }
    if (message.body === 'Video' || message.body === 'video') {
      sendVideo( client, message.from );
    }
  });
}

// Funciones de envío desde el API a Venom

const postReceiveMessage = async( req, res ) => {
  return res.status(200).json(req.body)
}

const postSendMessage = async( req, res ) => {

  const { from, text } = req.body;
  
  sendText(client_global, from, text);
  return res.status(200).json({
    status: "ok",
    msg: "mensaje enviado"
  })
}

const postSendImage = async( req, res ) => {

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

const postSendVideo = async( req, res ) => {

  const { from, file } = req.body;
  
  sendVideo(client_global, from, file);
  return res.status(200).json({
    status: "ok",
    msg: "mensaje enviado"
  })
}

const postSendLocation = async( req, res ) => {

  const { from, latitude, longitude, country } = req.body;
  
  sendLocation(client_global, from, latitude, longitude, country);
  return res.status(200).json({
    status: "ok",
    msg: "mensaje enviado"
  })
}

const postSendContact = async( req, res ) => {

  const { from, number, name } = req.body;
  
  sendContact(client_global, from, number, name);
  return res.status(200).json({
    status: "ok",
    msg: "mensaje enviado"
  })
}

const postSendContactList = async( req, res ) => {

  const { from, number_1, number_2 } = req.body;
  
  sendContactList(client_global, from, number_1, number_2);
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
  postSendVideo,
  postSendLocation,
  postSendContact,
  postSendContactList,
  start
}