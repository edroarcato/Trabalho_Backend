const express = require('express');
const { gerarToken, verificarToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;

  if (username === 'pedro.marcato@iesb.edu.br' && password === 'abcd1234') {
    const payload = {
      iss: "Minha API",
      email: username,
      nome: "Pedro",
      perfil: "admin"
    };
    try {
      return res.json({ token: gerarToken(payload) });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  return res.status(401).json({ msg: "Credenciais invalidas" })
});

router.post('/renovar', verificarToken, function (req, res) {
  try {
    const payload = {
      iss: req.payload.iss,
      email: req.payload.email,
      nome: req.payload.nome,
      perfil: req.payload.perfil
    };
    return res.json({ token: gerarToken(payload) });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
