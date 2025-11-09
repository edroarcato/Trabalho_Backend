const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { gerarToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'E-mail já cadastrado' });
    }

    const novoUsuario = await User.create({ nome, email, senha });

    return res.status(201).json({
      id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email
    });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ msg: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ msg: 'Senha incorreta' });
    }

    const payload = {
      iss: "Minha API",
      email: usuario.email,
      nome: usuario.nome,
      perfil: "user"
    };

    const token = gerarToken(payload);
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
