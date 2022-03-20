
/* retrieve the model : necessary to interact with the database */
const Items = require('../models/item.model').model;
const Users = require('../models/user.model').model;

const listMyItems =  async (req, res) => {
      const user = await Users.findById(req.userId);
      const allItems = await Items.find( {soldBy:user.login} );
      res.render('allitems',                 // then use the result of the query to render the view in 'allitems.pug'
                 {
                   title : "Vos annonces",
                   items : allItems,
                   myItems : true,
                   user : user
                 }
                );
}

const listOtherItems =  async (req, res) => {
  const user = await Users.findById( req.userId );
  const allItems = await Items.find( {soldBy: {$ne: user.login} } );
  res.render('allitems',                 // then use the result of the query to render the view in 'allitems.pug'
             {
               title : "Liste d'objets en vente",
               items : allItems,
               myItems : false,
               user : user
             }
            );
}

/* controller for path /items/one : find one item */
const oneItem =
  async (_, res) => {
    const foundItem = await Items.findOne();     // select first found document
    res.render('itemdetail',
              {
                title : 'Premier objet mis en vente',
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
                              title : 'Annonce retrouvée par identifiant',
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
 }

  /*
  * deleting
  */
  const deleteItem =
    async (req,res) => {
      try {
        const user = await Users.findById( req.userId );
        const item = await Items.findById( req.params.itemId );
        if(item.soldBy === user.login) {  // problème : on veut aussi pouvoir deleteItem quand on l'achète, donc on n'est pas le vendeur... faire autre fonction?
          await Items.findByIdAndRemove( req.params.itemId ).remove();
          console.log(`--> item ${req.params.itemId} deleted`);
          res.status(301).redirect('/items');
        }
        else
          res.status(401).redirect('/items');
      }
      catch(error) {
        throw error ;
      }
    }
  
  /*
  * buying
  */
  const buyItem = 
    async (req,res) => {
      try {
        const buyer = await Users.findById( req.userId );
        const item = await Items.findById( req.params.itemId );
        const seller = await Users.find( {login: item.soldBy} );
        const itprice = item.price;
        if(itprice <= buyer.money) {
          await User.findByIdAndUpdate(buyer.id,
                                    { money: buyer.money - itprice },
                                    { new : true });
          await User.findByIdAndUpdate(seller.id,
                                    { money: seller.money + itprice },
                                    { new : true });
          await Items.findByIdAndRemove( req.params.itemId ).remove();
          console.log(`--> item ${req.params.itemId} sold to ${buyer.login}`);
          res.status(301);
        }
        else
          res.status(401);
      }
      catch(error) {
        throw error ;
      }
    }

 /* controller for GET /create : return the view with create form */
 const createForm =   (_,res) => res.render('createItem', { title: "Création d'une annonce" });

module.exports.listMyItems = listMyItems;
module.exports.listOtherItems = listOtherItems;
module.exports.oneItem = oneItem;
module.exports.details = details;
module.exports.create = createItem;
module.exports.createForm = createForm;

module.exports.delete = deleteItem;
