const express = require('express');
const router = express.Router();

/* GET home page. */
// 'render' utilise le moteur de vue (donc pour nous, 'pug')
// pour construire les pages fournies en réponse
const indexController = require('../controllers/index.controller');

router.get('/', indexController.home);

module.exports = router;
