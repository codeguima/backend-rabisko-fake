import { db } from '../../db.js';

export const getAllTattoos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await db.query('SELECT * FROM tattoos ORDER BY id DESC LIMIT ? OFFSET ?', [limit, offset]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar tatuagens', error: err });
  }
};


export const getTattooById = async (req, res) => {
  const { id } = req.params;
  try {
    const [profileRows] = await db.query('SELECT * FROM tattoos WHERE userName = ?', [id]);
    if (profileRows.length === 0) {
      return res.status(404).json({ message: 'Fotos do Perfil não encontrado' });
    }

    const profile = profileRows; // pega o primeiro perfil encontrado
    res.json(profile); // envia o perfil
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tatuagens do perfil', error });
  }
};