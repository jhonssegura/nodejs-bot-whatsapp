const axios = require('axios');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');
const { sendImage, sendText, sendFilePDF, sendVoice, sendVideo, sendLocation, sendContact, sendContactList } = require('../actions/response');
var client_global;

const start = (client) => {
  
  client_global = client;

  client.onMessage( async (message) => {

    console.log("Detalle del mensaje", message)

    // MEDIA FILES
    if (message.isMedia === true || message.isMMS === true) {
      // let baseDir = path.join(__dirname, '/controllers/../uploads/');
      const buffer = await client.decryptFile(message);
      const fileName = `./uploads/${ uuidv4() }.${mime.extension(message.mimetype)}`;
      // const saveFile = await client.decryptFileSave('./uploads/',message, fileName)
      fs.writeFileSync(fileName, buffer);
      
    }


    if (message.type === "vcard") {
      // Contacto
      console.log("Tipo Contacto", message.body)
      let contact_data = {
        id: message.id,
        type: message.type,
        content: message.body,
        to: message.to,
        from: message.from,
        mimetype: "contact"
      }

      axios.post('/vcard', contact_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("Detalle del contacto: ", contact_data)
    }
    if (message.type === "chat") {
      // Texto
      let text_data = {
        id: message.id,
        type: message.type,
        content: message.body,
        to: message.to,
        from: message.from,
        mimetype: "text"
      }

      axios.post('/chat', text_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("Tipo Texto", text_data)
    }
    if (message.type === "image") {
      // var ReadableData = require('stream').Readable
      // const imageBufferData = Buffer.from(message.body, 'base64');
      // var streamObj = new ReadableData()
      //streamObj.push(imageBufferData)
      //streamObj.push(null)
      //streamObj.pipe(fs.createWriteStream('testImage.jpg'));
      // streamObj.pipe(fs.createWriteStream('uploads','testImage.jpg'));

      fs.writeFile('uploads/image.png', message.body, {encoding: 'base64'}, function(err) {
        console.log('File created');
      });

      // const fileContents = new Buffer(message.body, 'base64')
      // fs.writeFile('./uploads', fileContents, (err) => {
      //  if (err) return console.error(err)
      //    console.log('file saved to ')
      // })

      // buffer image data to convert richh START FILE
      // var data =  message.body;
      /* 
      function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
         response = {};

        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
      }
      */


      //var imageBuffer = decodeBase64Image(data);
      // console.log("image buffer",imageBuffer);
      // fs.writeFile('test.jpg', imageBuffer.data, function(err) {
      //  console.log(err);
      // });


      // buffer image data to convert richh END FILE
      // Imagen
      let image_data = {
        id: message.id,
        type: message.type,
        content: message.body,
        to: message.to,
        from: message.from,
        mimetype: message.mimetype
      }

      axios.post('/image', image_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
      console.log("Detalle del image: \n", image_data)
    }
    if (message.type == "audio") {
      // Audio
      let audio_data = {
        id: message.id,
        type: message.type,
        // content: message.body,
        to: message.to,
        from: message.from,
        mimetype: message.mimetype
      }

      axios.post('/audio', audio_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("Detalle del audio: \n", audio_data)
    }
    if (message.type == "video") {
      // Video
      let video_data = {
        id: message.id,
        type: message.type,
        content: message.body,
        to: message.to,
        from: message.from,
        mimetype: message.mimetype
      }

      axios.post('/video', video_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("Detalle del video: \n", video_data)
    }
    if (message.type == "location") {
      // Localizacion
      let location_data = {
        id: message.id,
        type: message.type,
        content: message.body,
        to: message.to,
        from: message.from,
        mimetype: message.mimetype,
        latitude: message.lat,
        longitude: message.lng
      }

      axios.post('/location', location_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("Detalle de la localizacion: \n", location_data)
    }
    if (message.type == "document") {
      
      // Documento
      let document_data = {
        id: message.id,
        type: message.type,
        content: message.body,
        to: message.to,
        from: message.from,
        mimetype: message.mimetype
      }

      axios.post('/document', document_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("Detalle del documento: \n", document_data)
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

  const { from, link, text } = req.body;
  
  sendVideo(client_global, from, link, text);
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