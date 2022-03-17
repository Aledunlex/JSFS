const User = require('../models/user.model').model;

module.exports.home = (_,res) => res.render('user', { title : "Gestion du compte" });

module.exports.me =
  async (req, res) =>  {
    const user = await User.findById(req.userId);
    console.log(user);
    console.log(req.userId);
    res.status(200).json({ login : user.login });
  }

module.exports.update =
  async (req,res) => {
    const updatedData = { ...req.body };
    console.log(updatedData);
    const user = await User.findByIdAndUpdate(req.userId,
                                              updatedData,
                                              { new : true });
    res.status(200).json({ money : user.money , message : 'mise à jour réussie'});
  }
