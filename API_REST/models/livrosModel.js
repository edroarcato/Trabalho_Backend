const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
    minlength: [3, 'Título deve ter pelo menos 3 caracteres']
  },
  autor: {
    type: String,
    required: [true, 'Autor é obrigatório'],
    trim: true
  },
  publicadoEm: {
    type: Date
  },
  disponivel: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Livro', schema);
