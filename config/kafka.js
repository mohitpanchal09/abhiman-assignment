const {Kafka} = require('kafkajs')

const kafka = new Kafka({
    clientId:'voting-app',
    brokers : ['localhost:9092'], // to tell where the broker is running (KAFKA),
}) 


module.exports = kafka