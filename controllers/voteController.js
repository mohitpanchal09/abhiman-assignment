const sendVoteToKafka = require("../kafka/producer");
const { emitToClients } = require("../websocket/socketio");
const prisma = require("../db/db");

const createVote = async(req,res)=>{
  try{
    const pollId = parseInt(req.params.id);
    const { userId, optionId } = req.body;
    const voteData = {
      userId,
      pollId,
      optionId,
    };
    await sendVoteToKafka(voteData);

    return res.status(201).json({ message: 'Vote recorded successfully, processing in background' });
  }catch(err){
    console.error('err',err);
    res.status(500).json({ error: 'Failed to make vote' });
  }
}


module.exports = {createVote}