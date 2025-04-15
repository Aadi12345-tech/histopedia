const express = require('express');
const User = require('../models/users'); 
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

router.get("/:id", async (req, res) => {
   try {
       const { id } = req.params;

       const user = await User.findById(id);
       
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }

       res.status(200).json(user);
   } catch (err) {
       console.error("Error finding user:", err);
       res.status(500).json({ message: "Error finding user", error: err.message || err });
   }
});

//Post
router.post("/", async (req, res) => {
   try {
       const {username, password} = req.body;

       if (!username || !password) {
           return res.status(400).json({ message: "Username and password required" });
       }

       const user1 = await User.findOne({username});
       if(user1)
       {
        res.json(user1)
         return;
       }

       const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

       const newUserData = {
        username, 
        "password": hashedPassword 
    }
       const newUser = new User(newUserData);
       await newUser.save();

       res.status(201).json({ newUser });
   } catch (err) {
       console.error("Error creating user:", err);
       res.status(500).json({ message: "Error creating user", error: err.message || err });
   }
});

//patch
router.patch("/users/:id", async (req, res) => {
   try {
       const { id } = req.params;
       const { username, password } = req.body;

       let user = await User.findById(id);
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }

       const oldUsername = user.username;

       if (username) {
           user.username = username;

       }

       if (password) {
           const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
           user.password = await bcrypt.hash(password, saltRounds);
       }

       await user.save();
       res.status(200).json({ message: "User updated successfully", user });
       
   } catch (err) {
       console.error("Error updating user:", err);
       res.status(500).json({ message: "Error updating user", error: err.message || err });
   }
});

//delete
router.delete("/users/:id", async (req, res) => {
   try {
       const { id } = req.params;

       const user = await User.findById(id);
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }

       await User.findByIdAndDelete(id);


       res.status(200).json({ message: "User  deleted successfully" });

   } catch (err) {
       console.error("Error deleting user:", err);
       res.status(500).json({ message: "Error deleting user", error: err.message || err });
   }
});


module.exports = router;