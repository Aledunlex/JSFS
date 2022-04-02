const Items = require('../models/item.model').model;
const Users = require('../models/user.model').model;

// define a REST like API available for route /items

// controller for GET /
const allItems =
  async (req,res) => {
        console.log(req.userId);
        const allItems = await Items.find();
        res.status(200).json(allItems);
    }


// controller for POST /
const createItem =
  async (req,res) => {
   const newItemData = { ...req.body };
   try {
     console.log(req.userId);
     newItemData.soldBy = req.userId;
     console.log(newItemData);
     const createdItem = await Items.create(newItemData);
     res.status(201).json(createdItem);
   }
   catch(error) {
     res.status(400).json(error);
   }
  }

// controller for PUT /:itemId
const buyItem =
  async (req, res) => {
    const foundItem = await Items.findById( req.params.itemId );
    const buyer = await Users.findById( req.userId );
    const seller = await Users.findById( foundItem.soldBy );
    const itprice = foundItem.price;
    if(itprice <= buyer.money) {
      const updatedBuyer = await Users.findByIdAndUpdate(buyer.id,
                                { money: buyer.money - itprice },
                                { new : true });
      const updatedSeller =await Users.findByIdAndUpdate(seller.id,
                                { money: seller.money + itprice },
                                { new : true });
      await Items.deleteOne( foundItem );
      console.log(`--> item ${foundItem.title} sold by ${seller.login} to ${buyer.login}`);
      res.status(201).json({updatedBuyer, updatedSeller});
    }
  }

// controller for DELETE /:itemId
const deleteItem =
  async (req,res) => {
      await Items.findByIdAndRemove( req.params.itemId );
      res.status(200).json(null);
   }

module.exports.allItems = allItems;
module.exports.createItem = createItem;
module.exports.buyItem = buyItem;
module.exports.deleteItem = deleteItem;
