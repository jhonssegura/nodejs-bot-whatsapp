const venom = require('venom-bot');
// const { start } = require('../actions/start');
const { start } = require('../controllers/Chat');

const sessions = async () => {

  //crear una lista de sessiones 

  console.log("primera instancia");
  const marketingClient = await venom.create(
  'keos',
  (base64Qr, asciiQR, attempts, urlCode) => {
    console.log(asciiQR); // Optional to log the QR in the terminal
    var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');

    var imageBuffer = response;
    require('fs').writeFile(
      'qrcode/out.png',
      imageBuffer['data'],
      'binary',
      function (err) {
        if (err != null) {
          console.log(err);
        }
      }
    );
  },
  undefined,
  { logQR: false }
  )
  
  start(marketingClient);
  
  // console.log("segunda instancia");
  // const salesClient = await venom.create('keos');
  // start(salesClient)

  // const supportClient = await venom.create('rpa');
  // start(supportClient)

};

module.exports = {
  sessions
}