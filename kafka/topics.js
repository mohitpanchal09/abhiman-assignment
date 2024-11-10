const kafka = require('../config/kafka');
const admin = kafka.admin();

//function to create topics
const createTopics = async () => {
  await admin.connect();

  await admin.createTopics({
    topics: [
      {
        topic: 'poll-votes',
        numPartitions: 2,    // Number of partitions for concurrency
        replicationFactor: 1,
      }
    ],
  });

  console.log('Topics created');
  await admin.disconnect();
};

module.exports = createTopics;
