const express = require('express');
const router = express.Router();

/* GET home page. */
// 'render' utilise le moteur de vue (donc pour nous, 'pug')
// pour construire les pages fournies en réponse
router.get('/', (req, res, next) => res.render('index', { title: 'Express' }) );

module.exports = router;
