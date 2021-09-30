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

module.exports = {
  sendImage,
  sendButtons,
  sendText,
  sendLocation
}