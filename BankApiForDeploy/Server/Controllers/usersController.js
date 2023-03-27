const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User= require("../model/User")
require('dotenv').config()


//@desc add new user
//@route POST /api/
//@access Manager only
  async function addUser(req, res, next) {
    console.log("hello");
    try {
      const {passportId, name, email, phone,password,role }= req.body;
      // Validate user type
      if(!passportId || !name || !email || !phone) {
        res.status(400)
        throw new Error('all fields required');
      }
      // hash Password
      const hashedPassword = await bcrypt.hash(password, 10)
      // Create new user
      const newUser = new User({ passportId,name, email,phone,password:hashedPassword,
        ...(role && { role })//if role is undefined it will not be passed to newUser
      });
  
      // Save user to database
      await newUser.save();
      res.status(201).json({message:"userCreated",User:newUser});
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({ error: 'Duplicate passport ID or email.' });
      } else {
        next(err);
      }
    }
  }
  
//@desc getUserByPId
//@route GET /api/:PId
//@access Manager only
const getByPId=async(req,res,next)=>{
  const passportId = req.params.id;
    
  try {
    if(!passportId) throw new Error("passportId is undefined");
    console.log(passportId);
    // Find user by passport ID
    const user = await User.findOne({ passportId });
    if (!user) {
       res.status(404)
       throw new Error( 'User not found') 
    }
    console.log(user);
    res.json(user);
  } catch (err) {
    next(err);
  }

}
//@desc getAllUsers 
//@route GET /api/users/
//@access Manager user
  const getAll = async (req, res, next) => {
    try {
      const users = await User.find();
      if(!users) {
        throw new Error("there is no users")
      }
      res.json(users);
    } catch (err) {
      next(err);
    }
  };
  


//@desc Deposit cash to a user
//@route POST /api/deposit
//@access Manager only
  const depositCash = async (req, res, next) => {
    const { passportId, cash } = req.body;
    
    try {
      if(!passportId||!cash) throw new Error("passportId or cash are undefined");

      // Find user by passport ID
      const user = await User.findOne({ passportId });
      if (!user) {
         res.status(404)
         throw new Error( 'User not found') 
      }
  
      // Add cash to user's balance
      user.cash += cash;
      await user.save();
  
      res.json({ message: `Deposited ${cash} to user ${user.name}` });
    } catch (err) {
      next(err);
    }
  };


//@desc update user creadit 
//@route POST /api/update creadit 
//@access Manager and user
  const updateCredit = async (req, res, next) => {
    const { passportId, credit } = req.body;
    console.log(passportId,credit);
    try {
      // Find user by passport ID
      const user = await User.findOne({ passportId });
      if (!user) {
        res.status(404)
        throw new Error('User not found') 
      }
      // Check if credit is positive
      if (credit <= 0) {
        return res.status(400).json({ message: 'Credit must be a positive number' });
      }
      // Update user's credit
      user.credit = credit;
      await user.save();
  
      res.json({ message: `Updated user ${user.name}'s credit to ${credit}` });
    } catch (err) {
      next(err);
    }
  };
  
//@desc withdraw money  
//@route POST /api/withdraw money 
//@access Manager only
const withdraw = async (req, res, next) => {
  const { passportId, amount } = req.body;

  try {
    // Find user by passport ID
    const user = await User.findOne({ passportId });
    if (!user) {
      res.status(404)
       throw new Error('User not found')
    }

    // Check if user has enough funds in their wallet
    const totalFunds = user.cash + user.credit;
    if (amount > totalFunds) {
      res.status(400)
      throw new Error ('Not enough funds');
    }

    // Subtract amount from user's funds
    if (amount <= user.cash) {
      user.cash -= amount;
    } else {
      user.credit -= (amount - user.cash);
      user.cash = 0;
    }
    await user.save();
    res.json({ message: `Withdrew ${amount} from user ${user.name}'s wallet`,userCash:user.cash,userCredit:user.credit});
  } catch (err) {
    next(err);
  }
};

//@desc transfare money  
//@route POST /api/transfare
//@access Manager user
const transfer = async (req, res, next) => {
  const { senderPassportId, receiverPassportId, amount } = req.body;

  try {
    // Find sender user by passport ID
    const sender = await User.findOne({ passportId: senderPassportId });
    if (!sender) {
       res.status(404)
       throw new Error('Sender user not found') 
    }

    // Find receiver user by passport ID
    const receiver = await User.findOne({ passportId: receiverPassportId });
    if (!receiver) {
      res.status(404)
      throw new Error('reciver user not found')
    }

    // Check if sender has enough cash and credit to transfer
    if (amount > (sender.cash + sender.credit) ) {
      res.status(400)
      throw new Error ('Not enough funds');
    }

    // Deduct cash and credit from sender
    if (sender.cash >= amount) {
      sender.cash -= amount;
    } else {
      sender.credit -= (amount - sender.cash);
      sender.cash = 0;
    }
    await sender.save();

    // Add cash and credit to receiver
    receiver.cash += amount;
    await receiver.save();

    res.json({ message: `Transferred ${amount} from ${sender.name} to ${receiver.name}` });  
  } catch (err) {
    next(err);
  }
};




module.exports = {addUser,depositCash,getByPId,updateCredit,withdraw,transfer,getAll}