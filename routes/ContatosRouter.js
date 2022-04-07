const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/ContatosController');

router.get('/', contatoController.index);
router.get('/search', contatoController.search);
router.get('/:id', contatoController.show);
router.post('/', contatoController.create);
router.delete('/:id', contatoController.destroy);
router.put('/:id', contatoController.update);


module.exports = router;