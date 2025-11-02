const mongoose = require('mongoose');
const Livro = require('../models/livrosModel');

async function criar(req, res) {
  try {
    const novoLivro = await Livro.create(req.body);
    return res.status(201).json(novoLivro);
  } catch (err) {
    if (err.errors) {
      return res.status(422).json({ msg: Object.values(err.errors)[0].message });
    }
    return res.status(500).json({ msg: err.message });
  }
}

async function listar(req, res) {
  const livros = await Livro.find({});
  return res.json(livros);
}

async function buscar(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  const livro = await Livro.findById(id);
  if (!livro) return res.status(404).json({ msg: "Livro não encontrado" });

  req.livro = livro;
  return next();
}

function exibir(req, res) {
  return res.json(req.livro);
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const livroAtualizado = await Livro.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    return res.json(livroAtualizado);
  } catch (err) {
    if (err.errors) {
      return res.status(422).json({ msg: Object.values(err.errors)[0].message });
    }
    return res.status(500).json({ msg: err.message });
  }
}

async function remover(req, res) {
  const { id } = req.params;
  await Livro.findByIdAndDelete(id);
  return res.status(204).end();
}

module.exports = { criar, listar, buscar, exibir, atualizar, remover };
