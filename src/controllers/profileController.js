import { db } from '../../db.js';

export const getAllProfiles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM profiles');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfis', error });
  }
};

export const getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const [profileRows] = await db.query('SELECT * FROM profiles WHERE userName = ?', [id]);
    if (profileRows.length === 0) {
      return res.status(404).json({ message: 'Perfil não encontrado' });
    }

    const profile = profileRows[0]; // pega o primeiro perfil encontrado
    res.json(profile); // envia o perfil
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil', error });
  }
};

