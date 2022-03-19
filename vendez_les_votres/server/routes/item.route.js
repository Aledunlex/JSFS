const express = require('express');
const router = express.Router();

// import controller for items
const itemsController = require('../controllers/item.controller');

const authMiddleware = require('../middlewares/authentification.middleware');

// associate controller method to path and method
router.get('/', authMiddleware.validToken, itemsController.listOtherItems);
router.get('/myitems', authMiddleware.validToken, itemsController.listMyItems);

router.get('/one', authMiddleware.validToken, itemsController.oneItem);
router.get('/details/:itemId', authMiddleware.validToken, itemsController.details );


// path '/items/create' can be accessed using GET (for view) or POST (for item creation)
router.get('/create', authMiddleware.validToken, itemsController.createForm );
router.post('/create', authMiddleware.validToken, itemsController.create );

// remove document
router.get('/delete/:itemId', authMiddleware.validToken, itemsController.delete );


// export items route
module.exports = router;
