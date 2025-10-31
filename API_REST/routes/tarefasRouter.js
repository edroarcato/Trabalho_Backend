const express = require('express');
const { verificarToken } = require('../middlewares/auth');
const controller = require('../controllers/tarefasController');

const router = express.Router();

router.post('/', verificarToken, controller.criar);
router.put('/:id', verificarToken, controller.buscar, controller.atualizar);
router.delete('/:id', verificarToken, controller.buscar, controller.remover);

router.get('/', controller.listar);
router.get('/:id', controller.buscar, controller.exibir);

module.exports = router;