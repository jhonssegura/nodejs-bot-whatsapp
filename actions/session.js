const venom = require('venom-bot');
const { start } = require('../actions/start');

const sessions = async () => {

  //crear una lista de sessiones 
  const marketingClient = await venom.create('marketing');
  start(marketingClient);

  // const salesClient = await venom.create('sales');
  // start(salesClient)

  // const supportClient = await venom.create('support');
  // start(supportClient)

};

module.exports = {
  sessions
}