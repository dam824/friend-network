const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Friend = require('../models/friend.model');




router.get('/all-my-friends', passport.authenticate('jwt', {session:false}), (req, res, next) => {
 
     const errors = {};
     Friend.find({user:req.user._id })
       .populate('friend', ['name', 'email','role'])
          .then(friends => {
            if (!friends) {
              errors.nofriend = 'There are no friends';
              return res.status(404).json(errors);
            }

           res.json({users:friends,user:req.user});
    })
    .catch(err => res.status(404).json({ profile: 'There are no friends' }));

 });




router.post('/add-friend',passport.authenticate('jwt', {session:false}),(req, res, next) => {
   
   let friend=new Friend({
     user:req.user._id,
     friend:req.body.friend
   }) ;

   friend.save((err) => {
       if(err) {
        res.json({success: false, msg: "Erreur lors de l'ajout"});
      } else {
        res.json({success: true, friend: friend});
      }
   });
 
});

router.delete('/delete-friend/:id',passport.authenticate('jwt', {session:false}),(req, res, next) => {
   

   Friend.remove({_id:req.params.id},(err) =>{
      if(err) {
        res.json({success: false, msg: "Erreur lors de la suppression"});
      } else {
        res.json({success: true, msg: "supprime"});
      }
   });
 
});

router.post('/add-anonym-friend',passport.authenticate('jwt', {session:false}),(req,res) => {
  
    let newUser = new User ({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: "Erreur lors de la creation du compte anonym"});
    } else {
     
       let friend=new Friend({
         user:req.user._id,
         friend:user._id
       }) ;

       friend.save((err) => {
           if(err) {
            res.json({success: false, msg: "Erreur lors de l'ajout"});
          } else {
            res.json({success: true, friend: friend});
          }
       });
        
    }
  });

    

});


module.exports = router;
