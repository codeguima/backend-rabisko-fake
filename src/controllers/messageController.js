import { db } from '../../db.js';

export const getChatHistory = async (req, res) => {
  const { user } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT * FROM chat_messages WHERE user = ? ORDER BY date ASC',
      [user]
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar histórico do chat:', error);
    res.status(500).json({ error: 'Erro ao buscar histórico do chat' });
  }
};

export const sendMessage = async (req, res) => {
  const { user } = req.params;
  const { id, text, image, sender, date } = req.body;

  try {
    await db.query(
      'INSERT INTO messages (id, user, text, image, sender, date, isArchived) VALUES (?, ?, ?, ?, ?, ?, FALSE)',
      [id, user, text || null, image || null, sender, date]
    );

    res.status(201).json({ message: 'Mensagem enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
};


export const getActiveMessages = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM messages WHERE isArchived = FALSE');
  res.json(rows);
};

export const getArchivedMessages = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM messages WHERE isArchived = TRUE');
  res.json(rows);
};
