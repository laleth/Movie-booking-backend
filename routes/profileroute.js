const express = require("express");
const mongoose = require("mongoose");
const profilemodel = require("../models/profilemodel");
const usermodel = require("../models/usermodel");
const authUser = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const router = express.Router();
router.use(authUser);


router.get("/profile-details", async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.user.id);
      
      const user = await usermodel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const username = user.username;
  
      res.status(200).json({ username });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



router.get("/user-details", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const userExists = await usermodel.exists({ _id: userId });

    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = await usermodel.findOne({ _id: userId });


    res.status(200).json({ user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete-user", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const userExists = await usermodel.exists({ _id: userId });

    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }


    const confirmPassword = req.body.password;
    const existingUser = await usermodel.findOne({ _id: userId });

    if (!existingUser || !existingUser.password) {
      return res.status(404).json({ message: 'User not found or invalid password' });
    }

    const passwordMatches = await bcrypt.compare(confirmPassword, existingUser.password);

    if (passwordMatches) {
      const deleteResult = await usermodel.deleteOne({ _id: userId });
      if (deleteResult.deletedCount > 0) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'No User found' });
      }
    } else {
      res.status(401).json({ message: 'Invalid Password' });
    }
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
