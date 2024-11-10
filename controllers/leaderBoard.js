const prisma = require('../db/db');

const getLeaderBoard = async (req, res) => {
  try {
    // Fetch all polls with their options and the associated votes
    const polls = await prisma.poll.findMany({
      include: {
        options: {
          include: {
            votes: true, // Include votes for each option
          },
        },
      },
    });

    // Initialize an array to hold the leaderboard data
    let leaderboard = [];

    // Loop through each poll and its options to calculate the vote counts
    polls.forEach((poll) => {
      poll.options.forEach((option) => {
        // Count the votes for each option
        const voteCount = option.votes.length;

        // Add the option and its vote count to the leaderboard
        leaderboard.push({
          pollId: poll.id,
          optionId: option.id,
          optionText: option.text,
          voteCount: voteCount,
        });
      });
    });

    // Sort the leaderboard by vote count in descending order
    leaderboard = leaderboard.sort((a, b) => b.voteCount - a.voteCount);

    // Return the top 10 leaderboard entries
    const topLeaderboard = leaderboard.slice(0, 10);

    return res.json({
      status: 200,
      message: 'Leaderboard fetched successfully',
      leaderboard: topLeaderboard,
    });
  } catch (err) {
    console.log('Error fetching leaderboard:', err);
    return res.json({ status: 500, message: 'Failed to fetch leaderboard' });
  }
};

module.exports = { getLeaderBoard };
