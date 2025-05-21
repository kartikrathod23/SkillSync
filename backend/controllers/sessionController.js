import Session from '../models/Session.js';

export const requestSession = async (req, res) => {
  const { recipientId, topic, scheduledAt } = req.body;

  try {
    const newSession = await Session.create({
      requester: req.user._id,
      recipient: recipientId,
      topic,
      scheduledAt,
    });

    res.status(201).json(newSession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
