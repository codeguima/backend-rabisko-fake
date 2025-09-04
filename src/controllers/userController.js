import { db } from '../../db.js';


export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [response] = await db.query('SELECT * FROM users WHERE userName = ?', [id]);
    if (response.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const user = response[0]; // pega o primeiro perfil encontrado
    res.json(user); // envia o perfil
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
};
