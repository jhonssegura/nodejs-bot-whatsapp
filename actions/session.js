const venom = require('venom-bot');
// const { start } = require('../actions/start');
const { start } = require('../controllers/Chat');

const sessions = async () => {

  //crear una lista de sessiones 

  console.log("primera instancia");
  const marketingClient = await venom.create('keos');
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