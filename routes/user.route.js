const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
// connexion a la DB
const config = require('../config/database');
//import models
const User = require('../models/user.model');
const Friend = require('../models/friend.model');

// HTTP REQUEST POST localhost/.../register
router.post('/register', (req, res, next) => {
  

  User.getUserByEmail(req.body.email,(err,user) => {
    if(err)res.json({success: false, msg: "Une erreur est survenue"});
    if(user){
        
        res.json({success: false, msg: "Email deja utilisé"});
    }else{
       let newUser = new User ({
        //req.body => input dans le champs html != url
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
     });

     User.addUser(newUser, ( err, doc) => {
        if(err) {
          res.json({success: false, msg: "Erreur lors de l'incription"});
        } else {
          res.json({success: true, msg: 'Utilisateur inscrit'});
        }
     });
    }


  });


  
  
});

router.put('/update-profile', (req, res, next) => {
 
  User.findOneAndUpdate({_id:req.body._id},{
       name:req.body.name,
       email:req.body.email,
       role: req.body.role,
   }).then((err,user) => {
     
     res.json({success: true, msg: "Compte modifié"});
   });
});


router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'Utilisateur introuvable'});
    }
    //comparaison MDP
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 
        });
        res.json({
          //récupere le token crée pour récupérer l'utisiliateur
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Mauvais mot de passe'});
      }
    });
  });
});


router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.get('/all-users', passport.authenticate('jwt', {session:false}), (req, res, next) => {

 
 Friend.find({user:req.user._id }, function(err, users){
    var userIDs;
    if (err) {
      return;
    }

    userIDs = users.map(function (user) { return user.friend; });

    User.find({_id: {$nin: userIDs}}, function (err, items) {
        if (err) {
          return;
        }
           
           res.json({success: true, users: items,user: req.user})
  });

});

});




module.exports = router;
