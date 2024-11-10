const prisma = require("../db/db");
const { emitToClients } = require("../websocket/socketio");

// Create a new poll

const createPoll = async (req, res) => {
  console.log("first");
  try {
    const { title, options,userId } = req.body;

    if (!title || !userId || !options || options.length === 0) {
      return res
        .status(400)
        .json({ error: "Poll title, userId, and options are required" });
    }
    // Create a new poll and its options in the database
    const poll = await prisma.poll.create({
      data: {
        title,
        userId, // Link the poll to the user who created it
        options: {
          create: options.map((optionText) => ({
            option_text: optionText, // Store each option as an individual record
          })),
        },
      },
      include: {
        options: true, // Include options in the response
        user: true, // Include the user who created the poll
      },
    });

    // Broadcast poll creation to WebSocket clients via Socket.io
    emitToClients('poll-created', poll);

    return res.json({ status: 200, message: "poll created" });
  } catch (err) {
    console.log("err", err);
    return res.json({ status: 500, message: err });
  }
};

const getAllPolls = async (req, res) => {
  try {
    const polls = await prisma.poll.findMany({
      include: {
        options: true,
      },
    });

    return res.status(200).json(polls);
  } catch (err) {
    console.log("err", err);
    return res.json({ status: 500, message: err });
  }
};

const getPoll = async (req, res) => {
  const pollId = parseInt(req.params.id);

  if (isNaN(pollId)) {
    return res.status(400).json({ error: "Invalid poll ID" });
  }

  try {
    // Check if poll exists
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: {
          include: {
            votes: true, // Include votes to count the number of votes per option
          },
        },
      },
    });

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }
    // Count votes for each option
    console.log('pools',poll)
    const pollResults = poll.options.map((option) => ({
      option_text: option.option_text,
      vote_count: option.votes.length,
    }));

    return res.status(200).json({
      id:poll.id,
      title: poll.title,
      results: pollResults,
    });
  } catch (err) {
    console.error("err", err);
    res.status(500).json({ error: "Failed to fetch poll" });
  }
};

module.exports = { createPoll, getAllPolls, getPoll };
