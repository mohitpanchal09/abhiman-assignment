const kafka = require('../config/kafka');
const { emitToClients } = require('../websocket/socketio');
const producer = kafka.producer();

//it will produce the data and data will be sent to kafka service
const sendVoteToKafka = async (voteData) => {
  await producer.connect();
  
  await producer.send({
    topic: 'poll-votes',
    messages: [{ value: JSON.stringify(voteData) }],
  });

  console.log('Vote sent to Kafka:', voteData);

  // Broadcast the vote to all connected clients via Socket.io
  emitToClients('new-vote', voteData);  // Broadcast the vote event
  await producer.disconnect();
};

module.exports = sendVoteToKafka;
