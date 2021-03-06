const axios = require('axios');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');
const { sendImage, sendText, sendFile, sendVoice, sendVideo, sendLocation, sendContact, sendContactList } = require('../actions/response');
const { json } = require('express');
var client_global, file_general;

const start = (client) => {
  
  client_global = client;

  client.onMessage( async (message) => {

    console.log("Detalle del mensaje", message)

    // Download of file in Base64 to the original form
    if (message.isMedia === true || message.isMMS === true || message.type === 'ptt' || message.type === 'document' || message.type === 'sticker') {
      const buffer = await client.decryptFile(message);
      
      const fileName = `./uploads/${ uuidv4() }.${mime.extension(message.mimetype)}`;
      console.log("Este es el filename a revisar",fileName)
      file_general = fileName.split("/")[2] 
      fs.writeFileSync(fileName, buffer);
      
    }
    // Opción cuando es tipo contacto
    if (message.type === "vcard") {

      // Extrae la data para el nombre del contacto enviado
      let cadena = message.body;
      let indice = cadena.indexOf("FN");
      let extraido = cadena.substring(indice)
      let ret1 = extraido.replace('FN', '')
      let ret2 = ret1.replace('END:VCARD', '')
      let ret3 = ret2.replace('TEL;type=CELL;waid=', '') 
      let ret4 = ret3.replace('item1.X-ABLabel:Mobile', '')
      let ret5 = ret4.replace(/[^a-zA-Z ]/g, '')

      // Extrae la data para el numero del contacto enviado
      let cadena2 = message.body;
      let indice2 = cadena2.indexOf("+");
      let extraido2 = cadena2.substring(indice2)
      let ret6 = extraido2.replace('END:VCARD', '')
      let ret7 = ret6.replace(/[^0-9\.]+/g, '')

      // Combinación de los datos obtenidos del contacto enviado
      
      let result_contact = {"Name":ret5, "Number":ret7}
      console.log("Ahora en JSON: ", result_contact)

      let contact_data = {
        id: message.id,
        type: message.type,
        content: result_contact,
        to: message.to,
        from: message.from,
        client: message.sender.pushname,
        mimetype: "contact"
      }

      axios.post('https://sales-back.keos.co/wapi/get_mo?provider=4&host=51921740370', contact_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("Detalle del contacto: ", contact_data)
    }
    // Opción cuando es tipo texto
    if (message.type === "chat") {
      let text_data = {}
      if (message.sender.pushname == undefined) {
        console.log("Entro cuando es indefinidio")
        text_data = {
          id: message.id,
          type: message.type,
          content: message.body,
          to: message.to,
          from: message.from,
          client: message.sender.verifiedName,
          mimetype: "text"
        }
      }
      else if (message.sender.verifiedName == undefined) {
        console.log("Entro cuando es numero normal")
        text_data = {
          id: message.id,
          type: message.type,
          content: message.body,
          to: message.to,
          from: message.from,
          client: message.sender.pushname,
          mimetype: "text"
        }
      }
       
      axios.post('https://sales-back.keos.co/wapi/get_mo?provider=4&host=51921740370', text_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("Detalle del texto: \n", text_data)
    }
    // Opción cuando es tipo imagen
    if (message.type === "image") {

      let image_data = {
        id: message.id,
        type: message.type,
        content: file_general,
        to: message.to,
        from: message.from,
        client: message.sender.pushname, 
        mimetype: message.mimetype
      }

      axios.post('https://sales-back.keos.co/wapi/get_mo?provider=4&host=51921740370', image_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
      console.log("Detalle del image: \n", image_data)

    }
    // Opcion cuando es tipo audio
    if (message.type == "audio" || message.type === "ptt") {

      let audio_data = {
        id: message.id,
        type: message.type,
        content: file_general,
        to: message.to,
        from: message.from,
        client: message.sender.pushname,
        mimetype: message.mimetype
      }

      axios.post('https://sales-back.keos.co/wapi/get_mo?provider=4&host=51921740370', audio_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("Detalle del audio: \n", audio_data)
    }
    // Opcion cuando es tipo video
    if (message.type == "video") {

      let video_data = {
        id: message.id,
        type: message.type,
        content: file_general,
        to: message.to,
        from: message.from,
        client: message.sender.pushname,
        mimetype: message.mimetype
      }

      axios.post('https://sales-back.keos.co/wapi/get_mo?provider=4&host=51921740370', video_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("Detalle del video: \n", video_data)
    }
    // Opcion cuando es tipo ubicacion
    if (message.type == "location") {

      let location_data = {
        id: message.id,
        type: message.type,
        content: file_general,
        to: message.to,
        from: message.from,
        client: message.sender.pushname,
        mimetype: message.mimetype,
        latitude: message.lat,
        longitude: message.lng
      }

      axios.post('https://sales-back.keos.co/wapi/get_mo?provider=4&host=51921740370', location_data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("Detalle de la localizacion: \n", location_data)
    }
    // Opcion cuando es tipo documento
    if (message.type == "document") {

      let document_data = {
        id: message.id,
        type: message.type,
        content: file_general,
        to: message.to,
        from: message.from,
        client: message.sender.pushname,
        mimetype: message.mimetype,
        filename: message.filename
      }

      axios.post('https://sales-back.keos.co/wapi/get_mo?provider=4&host=51921740370', document_data)
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

  const arreglo = req.body
  const generado = JSON.stringify(arreglo)
  console.log("Cliente global", client_global)
  // console.log("File General", file_general)
  console.log("Este es el arreglo de datos", arreglo)
  if (arreglo.type === 'text' || arreglo.type === 'chat') {
    console.log("Entro a la opcion de texto")
    postSendText(req, res)
  }
  else if (arreglo.type.includes('image')) {
    console.log("Entró a la opcion de imagen")
    postSendImage(req, res)
  }
  else if (arreglo.type.includes('audio')) {
    console.log("Entró a la opcion de voice")
    postSendVoice(req, res)
  }
  else if (arreglo.type.includes('video')) {
    console.log("Entró a la opcion de video")
    postSendVideo(req, res)
  }
  else if (arreglo.type.includes('document') || arreglo.type.includes('application')) {
    console.log("Entró a la opcion de documento")
    postSendFile(req, res)
  }
  /*
  JSON.parse(generado, (key, value) => {

    if (key === 'number') {
      console.log("Entró a la opcion de contacto")
      postSendContact(req, res)
    }
    if (key === 'number_1') {
      console.log("Entró a la opcion de lista de contactos")
      postSendContactList(req, res)
    }
    if (key === 'latitude') {
      console.log("Entró a la opcion de ubicacion")
      postSendLocation(req, res)
    }
    if (key === 'file') {
      console.log("Entró a la opcion de archivo")
      postSendFile(req, res)
    }
    if (key === 'link') {
      console.log("Entró a la opcion de video")
      postSendVideo(req, res)
    }
  });
  */
  return res.status(200).json({
    status: "ok",
    msg: "mensaje enviado"
  })
}

const postSendText = async( req, res ) => {

  const { to, text } = req.body;

  let to_correct = to+'@c.us'

  sendText(client_global, to_correct, text);
}

const postSendImage = async( req, res ) => {

  const { to, url } = req.body

  let to_correct = to+'@c.us'

  (client_global, to_correct, url);
}

const postSendFile = async( req, res ) => {

  const { to, url } = req.body;

  let to_correct = to+'@c.us'
  
  sendFile(client_global, to_correct, url);
}

const postSendVoice = async( req, res ) => {

  const { to, url } = req.body;

  let to_correct = to+'@c.us'
  
  sendVoice(client_global, to_correct, url);
}

const postSendVideo = async( req, res ) => {

  const { to, url, text } = req.body;

  let to_correct = to+'@c.us'
  
  sendVideo(client_global, to_correct, url, text);
}

const postSendLocation = async( req, res ) => {

  const { from, latitude, longitude, country } = req.body;
  
  sendLocation(client_global, from, latitude, longitude, country);
}

const postSendContact = async( req, res ) => {

  const { from, number, name } = req.body;
  
  sendContact(client_global, from, number, name);
}

const postSendContactList = async( req, res ) => {

  const { from, number_1, number_2 } = req.body;
  
  sendContactList(client_global, from, number_1, number_2);
}

// get Image
const getPublicFile = async(req, res) => {
  const file = req.params.document;
  console.log("imagen q llega")

  const pathImg = path.join( __dirname, `../uploads/${ file }` );
  
  // imagen por defecto
  if ( fs.existsSync( pathImg ) ) {
  res.sendFile( pathImg );
  } else {
      const pathImg = path.join( __dirname, `../uploads/no-img.png` );
      res.sendFile( pathImg );
  }

}

// Get Qr Code
const getQrFile = async(req, res) => {
  const file = req.params.document;
  console.log("Imagen que llega del Qr.")

  const pathImg = path.join( __dirname, `../qrcode/out.png` );
  // imagen por defecto
  if ( fs.existsSync( pathImg ) ) {
    res.sendFile( pathImg );
    } else {
      const pathImg = path.join( __dirname, `../uploads/no-img.png` );
      res.sendFile( pathImg );
  }
}


module.exports = {
  postReceiveMessage,
  postSendMessage,
  postSendText,
  postSendImage,
  postSendFile,
  postSendVoice,
  postSendVideo,
  postSendLocation,
  postSendContact,
  postSendContactList,
  getPublicFile,
  getQrFile,
  start,
}