const kafka = require('../config/kafka');
const prisma = require('../db/db'); // Assuming prisma is already set up here
const consumer = kafka.consumer({ groupId: 'polling-group' });

const consumeVotes = async () => {
  try {
    console.log('connecting consumer...')
    await consumer.connect();
    console.log('connected consumer...')
    await consumer.subscribe({ topic: 'poll-votes', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const vote = JSON.parse(message.value.toString());

        try {
          // Save vote to the database using Prisma
          await prisma.vote.create({
            data: {
              pollId: vote.pollId,
              optionId: vote.optionId,
              userId: vote.userId,
            },
          });
          console.log('Vote saved to database:', vote);
        } catch (err) {
          console.error('Prisma error:', err);
        }
      },
    });
  } catch (err) {
    console.error('Kafka consumer error:', err);
  }
};


module.exports = consumeVotes;
