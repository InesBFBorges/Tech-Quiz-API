const express = require("express");
const router = express.Router();
const User = require("../models/user");

// router.get("/", async (req, res) => {
//     try{
//         const users = await User.find();
//         res.json(users);
//     }catch(err){
//         res.status(500).json({message: err.message})
//     }
// });

// router.get("/:id", getUser, (req, res) => {
//     res.json({
//         username: res?.user?.username,
//         password: res.user.password
//     });
// });

router.post("/postUser", getUser, async (req, res) => {
  if(res.user === null){ // If there is no user with the given username post that user in the database
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    try {
      const newUser = await user.save();
      res.status(200).json({error: false, message: "User created with success"});
    }catch(err){
      res.status(400).json({error: true, message: err.message});
    }
  }else { // If there is user with that username give a error message
    return res.json(400).json({error: true, message: "There is already a user with this username"});
  }
});

router.get("/enterApp", getUser, async (req, res) => {
  if(res.user === null){ 
    return res.status(400).json({error: true, message: "There is no user with this username"});
  }else { 
    return res.status(200).json(res.user);
  }
});

async function getUser(req, res, next) {
  let user;
  console.log(req.body.username);
  try {
    user = await User.findOne({username: new RegExp('^'+req.body.username+'$', "i")});

  }catch(err){
    return res.status(400).json({message: err.message});
  }

  res.user = user
  next();
}


module.exports = router;