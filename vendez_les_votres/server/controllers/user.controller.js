const User = require('../models/user.model').model;

module.exports.home = (_,res) => res.render('user', { title : "Gestion du compte" });

module.exports.me =
  async (req, res) =>  {
    try {
      const user = await User.findById(req.userId);
      res.status(200).json({ _id : user._id, login : user.login, money : user.money });
    }
    catch {
      res.status(401);
    }
  }

// appelé dans user.client.js par la fonction const update
// l'appel se fait car user.route définit router.put sur la route /user/me
// et user.clients, dans sa méthode update, fait une requête PUT sur cette route
// ici req.body fait référence à ce qui est définit dans requestOptions de
// la méthode update d'user.clients; 
module.exports.userupdate =
  async (req,res) => {
    const updatedData = { ...req.body };
    const user = await User.findByIdAndUpdate(req.userId,
                                              updatedData,
                                              { new : true });
    res.status(200).json({ login : user.login , message : 'mise à jour réussie'});
  }
