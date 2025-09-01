import { db } from '../../db.js';



export const getGeneralNotifications = async (req, res) => {
  const [rows] = await db.query("SELECT id, title, description, date FROM notifications WHERE type = 'general'");
  res.json(rows);
};

export const getFollowingNotifications = async (req, res) => {
  const [rows] = await db.query("SELECT id, user, action, date FROM notifications WHERE type = 'following'");
  res.json(rows);
};


