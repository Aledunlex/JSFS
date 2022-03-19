const express = require('express');
const router = express.Router();

// import controller for items
const itemsController = require('../controllers/item.controller');

const authMiddleware = require('../middlewares/authentification.middleware');

// associate controller method to path and method
router.get('/', authMiddleware.validToken, itemsController.list);

router.get('/one', authMiddleware.validToken, itemsController.oneItem); //montre le premier posté sur le site
router.get('/details/:itemId', authMiddleware.validToken, itemsController.details );


// path '/items/create' can be accessed using GET (for view) or POST (for item creation)
router.get('/create', authMiddleware.validToken, itemsController.createForm );
router.post('/create', authMiddleware.validToken, itemsController.create );

// path '/items/adddetails/:itemId' can be accessed using GET (for item details view) or POST (for item details creation)
router.get('/adddetails/:itemId', authMiddleware.validToken, itemsController.addDetailsForm );
router.post('/adddetails/:itemId', authMiddleware.validToken, itemsController.addDetails );

// use method PUT for an update request
router.get('/update/:itemId', authMiddleware.validToken, itemsController.updateForm );
router.put('/update/:itemId', authMiddleware.validToken, itemsController.update );

// remove document
router.get('/delete/:itemId', authMiddleware.validToken, itemsController.delete );


// export items route
module.exports = router;
