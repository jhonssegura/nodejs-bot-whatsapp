// send text
const sendText = async (client, from, text='desde el bot') => {
  console.log('enviando client', client);
  console.log('enviando mensaje', from);
  
  await client
    .sendText(from, `👋 Bienvenido! ${text} `)
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    
    .catch((err) => {
      console.error('Error when sending: ', err); //return object error
    });    
}



// send Image
const sendImage = async (client, from, image)  => {
  if (image == "") {
    image = "images/response.jpg"
  }
  await client
    .sendImage(
      from,
      image,
      'image-name',
      'Caption text'
    )
    .then((result) => {
      console.log('Result: imagen enciaa', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });

}

// send Buttons
const sendButtons = async (client, message) => {
  const buttons = [
    {
      "buttonText": {
        "displayText": "Text of Button 1"
        }
      },
    {
      "buttonText": {
        "displayText": "Text of Button 2"
        }
      }
    ]
  await client.sendButtons(message.from, 'Title', buttons, 'Description')
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
}


// send location
const sendLocation = async (client, from, latitude, longitude, country) => {
  await client
    .sendLocation(from, latitude, longitude, country)
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
}

// send file PDF
const sendFilePDF = async (client, from, file) => {
  await client
    .sendFile(from, file, 'peru.pdf', 'Himno')
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
}

// send contact - Por Revisar
const sendContact = async (client, from, number, name) => {
  await client
  .sendContactVcard(from, number, name)
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}

// Send a list of contact cards
const sendContactList = async (client, from, number_1, number_2 ) => {
  await client
  .sendContactVcardList(from, [
    number_1,
    number_2,
  ])
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}

// Send audio file MP3
const sendVoice = async (client, from, file) => {
  await client
  .sendVoice(from, file)
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}

// Send video file MP4
const sendVideo = async (client, from, file) => {
  await client
  .sendVideoAsGif(from,
  file,
  'video.mp4',
  'mp4 file'
  )
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}

module.exports = {
  sendImage,
  sendButtons,
  sendText,
  sendLocation,
  sendFilePDF,
  sendContact,
  sendContactList,
  sendVoice,
  sendVideo,
}