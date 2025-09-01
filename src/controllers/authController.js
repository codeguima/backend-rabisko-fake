import { db } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (firstName, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      hashedPassword
    ]);

    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no registro', error: err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '30m'
    });

    res.json({ token, user: { userName: user.userName, email: user.email, userType: user.userType } });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login', error: err });
  }
};
