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
const sendImage = async (client, message)  => {
  await client
    .sendImage(
      message.from,
      'images/response.jpg',
      'image-name',
      'Caption text'
    )
    .then((result) => {
      console.log('Result: ', result); //return object success
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
const sendLocation = async (client, message) => {
  await client
    .sendLocation(message.from, '-13.6561589', '-69.7309264', 'Brasil')
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
}

// send file PDF
const sendFilePDF = async (client, message) => {
  await client
    .sendFile(message.from, 'files/pdf/peru.pdf', 'peru.pdf', 'Himno')
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
}

// send contact - Por Revisar
const sendContact = async (client, message) => {
  await client
  .sendContactVcard(message.from, '111111111111@c.us', 'Name of contact')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}

// Send a list of contact cards
const sendContactList = async (client, message) => {
  await client
  .sendContactVcardList(message.from, [
    '51916434356.us',
    '51916434356.us',
  ])
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}

// Send audio file MP3
const sendVoice = async (client, message) => {
  await client
  .sendVoice(message.from, 'files/mp3/interpol-song.mp3')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}

// Send video file MP4
const sendVideo = async (client, message) => {
  await client
  .sendVideoAsGif(message.from,
  'files/mp4/interpol-video.mp4',
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