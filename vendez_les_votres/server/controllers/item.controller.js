
/* retrieve the model : necessary to interact with the database */
const Items = require('../models/item.model').model;

const list =  async (_, res) => {
      const allItems = await Items.find();                    // select all the items from database
      res.render('allitems',                 // then use the result of the query to render the view in 'allitems.pug'
                 {
                   title : 'Item list (with async/await)',
                   items : allItems
                 }
                );
   }
/*
 *  controller that renders the item list found in the database
 */
const listThen =
  (_, res) =>
      Items.find()                                            // select all the items from database
           .then( allItems => res.render('allitems',             // then use the result of the query to render the view in 'allitems.pug'
                                         { title : 'Item list (with then)',
                                           items : allItems } ) );

/* controller for /items/dune : find item(s) with title Dune */
const dune =
  async (_, res) => {
    const allItems = await Items.find({title : 'Dune'});          // select all the documents that match the given property, here title='Dune'
    res.render( 'allitems',
                {
                  title : 'Only Dune',
                  request : "Items.find({title : 'Dune'})",
                  items : allItems
                } );
  }



const DEFAULT_YEAR = 2000;
/* controller for /items/afterv1/:year find items where year after :year */
const itemsAfter2000v1 =
  async (req, res) => {
     const from = parseInt(req.params.year) || DEFAULT_YEAR;
     const allItems = await Items.find({year : {$gt : from} });     // select all the documents that match the given property, here year > *from*
     res.render('allitems',
                {
                  title : 'Items only after ${from} (v1)',
                  request : 'Items.find({year : {$gt : ${from}} })',
                  items : allItems
                });

  }

/* controller for /items/afterb2/:year find items where year after :year */
const itemsAfter2000v2 =
   async (req, res) => {
     const from = parseInt(req.params.year) || DEFAULT_YEAR;
     const allItems = await Items.find().where('year').gt(from);       // select all the documents that match the given property, here year > *from*
     res.render('allitems', {
                           title : `Items only after ${from} (v2)`,
                           request :`Items.find().where('year').gt(${from})`,
                           items : allItems
                         }
               );
   }


/* controller for path /items/one : find one item */
const oneItem =
  async (_, res) => {
    const foundItem = await Items.findOne();     // select first found document
    res.render('itemdetail',
              {
                title : 'Only first item from list',
                request : 'Items.findOne()',
                item : foundItem
              }) ;
  }

/* controller for /details/:itemId :  find items with _id= :itemId using findById()
(quasi) équivalent à
           Items.findOne({ _id : req.params.itemId })
           Items.findOne().where('_id').equals( req.params.itemId )
*/
const details =
  async (req, res) => {
    const foundItem = await Items.findById( req.params.itemId );
    res.render('itemdetail',
                            {
                              title : 'Item by _id using findById()',
                              request : 'Items.findById( req.params.itemId )',
                              item : foundItem
                            } );
  }

/* controller for POST /create : execute the create operation in the db and return created item of successfull*/
const createItem =
 async (req, res, _) => {
   //const newItem = { title : req.body.title, author : req.body.author, year : req.body.year, cover : req.body.cover };
   const newItemData = { ...req.body };    // extract object from body using '...' operator and pattern matching
   try {
     const createdItem = await Items.create(newItemData);
     res.status(201).json(createdItem);
   }
   catch(error) {
     res.status(400).json(error);
   }
   /*  promise.then version
   Items.create(newItemData)
     .then( createdook => res.status(200).json(createdItem) ) ;    //  responds with code 200 and sends created item
     .catch( error => res.status(400).json(error) );       // if creation fails => responds with code 400
    */
 }

 /* details adding */
 /* controller for GET /details/:itemId */
 const addDetailsForm =
   async (req, res) => {
     const item = await Items.findById( req.params.itemId );
     res.render('addDetails', { item : item });
   }
 /* promise.then version
 Items.findById( req.params.itemId )
      .then( item => res.render('addDetails', { item : item }) );
 */


 /* controller for POST /details/:itemId */
 const addDetails =
   async (req, res) => {
     const details = { ...req.body };                   // in body we get details for item
     let item = await Items.findById( req.params.itemId );  // retrieve item by id
     try {
       item.details = details;      // add details to item
       item = await item.save();    // save modified item
       res.status(201).json(item);  // send modified item
     }
     catch(error) {
       res.status(400).json(error);
     }
   }
 /* promise.then version
 Items.findById( req.params.itemId )              // we find item by id according to param
      .then( item => {
                      item.details = details;      // item details are changed accroding to received data
                      return item.save();          // item is saved => details are updated
                     })
      .then( item => res.status(200).json(item))
      .catch( error => res.status(400).json(error) );
 */


 /*
  * updating
  */
 /* controller for GET /update/:itemId */
 const updateForm =
  async (req,res) => {
    const item = await Items.findById( req.params.itemId )       // for updating, we find item and send it to client
    res.render('updateItem', { item : item } );
  }

 /* controller for PUT /update/:itemId */
 const update =
   async (req,res) => {
    const updatedItemData = { ...req.body };            // new value for item is received from client
    try {
      const updatedItem = await Items.findByIdAndUpdate(
                                                         req.params.itemId,
                                                         updatedItemData,         // updating is done
                                                         { new : true }           // to get modified item as result
                                                       );
      res.status(201).json( updatedItem ) ;
    }
    catch( error ) {
      res.status(400).json(error);
    }
   }
 /* promise.then.catch version
 Items.findByIdAndUpdate( req.params.itemId, updatedItem, { new : true } )         // updating is done
   .then( () => res.status(200).json( {id : req.params.itemId} ) )
   .catch( error => res.status(400).json(error) );
 */

 /*
  * deleting
  */
 const deleteItem =
   async (req,res) => {
     try {
       await Items.findByIdAndRemove( req.params.itemId ).remove();
       console.log(`--> item ${req.params.itemId} deleted`);
       res.status(301).redirect('/items');
     }
     catch(error) {
       throw error ;
     }
   }


 /* controller for GET /create : return the view with create form */
 const createForm =   (_,res) => res.render('createItem');

module.exports.list = list;
module.exports.listThen = listThen;
module.exports.dune = dune;
module.exports.itemsAfter2000v1 = itemsAfter2000v1;
module.exports.itemsAfter2000v2 = itemsAfter2000v2;
module.exports.oneItem = oneItem;
module.exports.details = details;
module.exports.create = createItem;
module.exports.createForm = createForm;
module.exports.addDetailsForm = addDetailsForm;
module.exports.addDetails = addDetails;
module.exports.updateForm = updateForm;
module.exports.update = update;

module.exports.delete = deleteItem;
