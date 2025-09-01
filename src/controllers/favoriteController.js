import { db } from '../../db.js';


export const getFavoritedPosts = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM favorited');
  res.json(rows);
};


export const addFavoritePost = async (req, res) => {
  const { userId } = req.user; // vem do middleware de autenticação
  const { uri, description, author } = req.body;

  try {
    if (!uri || !author) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    await db.query(
      'INSERT INTO favorited (userId, uri, description, author) VALUES (?, ?, ?, ?)',
      [userId, uri, description, author]
    );

    res.status(201).json({ message: "Post favoritado com sucesso." });
  } catch (error) {
    console.error("Erro ao favoritar:", error);
    res.status(500).json({ message: "Erro ao favoritar o post." });
  }
};
