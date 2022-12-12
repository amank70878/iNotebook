const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'bdmncgsdgchjsg';

// ROUTE 1 ----> creating the authentication endpoint of createUser : NO-login required
router.post("/Createuser",[
    body("name", 'name must be more than 3 characters').isLength({ min: 3 }),
    body("email", 'please enter a valid email').isEmail(),
    body("password", 'password must be more than 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
      let success = false;
    //handling errors  
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      // check whether the user of given email exist in the database and if there is any error occured then try to catch it 
      let user = await User.findOne({email: req.body.email})
      if(user){
            return res.status(400).json({success, email: "user already existed, please try a different email"})
      }

      // making the password invisible by using salt and hashing techniques
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(req.body.password, salt)

      // adding the input values in the database
      user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
      });

      // creating the token data
      let data = {
            user:{
                  id: user.id
            }
      }

      // using token
      let authToken = jwt.sign(data, JWT_SECRET)
      success = true;
      res.json({success, authToken})

      } catch (error) { // handling the error
            console.error(error.message)
            res.status(500).send("some error occured")
      }
  }
);


// ROUTE 2 ----> creating the authentication endpoint of login the user : NO-login required
router.post("/login",[
      body("email", 'Enter a valid email').isEmail(),
      body("password", 'password cannot be black').exists(),
      ], async (req, res) => {
      let success = false;
      //handling errors  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
      }
      
      const {email, password} = req.body;

      try {
            // check whether the user's email exist in the database and if there is any error occured then try to catch it 
            let user = await User.findOne({email})
            if(!user){
                  return res.status(400).json({success, error: "please try to login with correct credentials"})
            }
            
            // compare the given password with hash 
            const compaarePass = await bcrypt.compare(password, user.password)
            if(!compaarePass){
                  return res.status(400).json({error: "please try to login with correct credentials"})
            }

            // the token data
            const data = {
                  user:{
                        id: user.id
                  }
            }

            // using token
            const authToken = jwt.sign(data, JWT_SECRET)
            success = true;
            res.json({success, authToken})
      } catch (error) { // handling the error
            console.error(error.message)
            res.status(500).send("some error occured")
      }


      }
)


// ROUTE 3 ----> get the details of the login user : login required
router.post("/getUserData", fetchuser, async (req, res) => {
      try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user)

      } catch (error) { // handling the error
            console.error(error.message)
            res.status(500).send("some error occured")
      }

})




module.exports = router;
