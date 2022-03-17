const express = require('express');
const router = express.Router();

// import controller for items
const itemsController = require('../controllers/item.controller');

// associate controller method to path and method
router.get('/', itemsController.list);

router.get('/then', itemsController.listThen);

router.get('/one', itemsController.oneItem); //montre le premier posté sur le site
router.get('/after/:year/v1', itemsController.itemsAfter2000v1);
router.get('/after/:year/v2', itemsController.itemsAfter2000v2);
router.get('/details/:itemId', itemsController.details );


// path '/items/create' can be accessed using GET (for view) or POST (for item creation)
router.get('/create', itemsController.createForm );
router.post('/create', itemsController.create );

// path '/items/adddetails/:itemId' can be accessed using GET (for item details view) or POST (for item details creation)
router.get('/adddetails/:itemId', itemsController.addDetailsForm );
router.post('/adddetails/:itemId', itemsController.addDetails );

// use method PUT for an update request
router.get('/update/:itemId', itemsController.updateForm );
router.put('/update/:itemId', itemsController.update );

// remove document
router.get('/delete/:itemId', itemsController.delete );


// export items route
module.exports = router;
