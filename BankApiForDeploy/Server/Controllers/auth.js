const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const loginUser = async (req, res, next) => {

  const {
    email,
    password
  } = req.body;
  console.log(email,password);
  try {
    // Find user by email
    const user = await User.findOne({
      email: email
    })
    if (!user) {
      res.statusCode = 404;
      throw new Error('User not found');
    }
    console.log("login",user.role);
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.statusCode = 404;
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign({
        userId: user.passportId,
        role: user.role
      },
      process.env.JWTSECRET, {
        expiresIn: '1h'
      }
    );

    // Set JWT token as a cookie in the response
    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000) // expires in 1 hour
    });
  
    res.json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

const authorize = async (req, res, next) => {
  const cookie = req.cookies;
  const token = cookie.jwt;
  if (!token) {
    return res.status(401).send({
      message: 'Unauthorized'
    });
  }
  try {
    const decryptToken = jwt.verify(token, process.env.JWTSECRET);
    if(!decryptToken){
      throw new Error("Token is not valid, Unauthorized")
    }
      next();
  } catch (e) {
    return res.status(401).send({
      message: e.message
    });
  }
}
const adminAuthorize = async (req, res, next) => {
  const cookie = req.cookies;
  const token = cookie.jwt;
  if (!token) {
    return res.status(401).send({
      message: 'Unauthorized'
    });
  }
  try {
    const decryptToken = jwt.verify(token, process.env.JWTSECRET);
    if(!decryptToken){
      throw new Error("Token is not valid, Unauthorized")
    }
    console.log(decryptToken.role);
    if (decryptToken.role === "user") {
      throw new Error('Unauthorized, you are Regular User');
    } else if (decryptToken.role === "manager") {
      next();
    } else {
      throw new Error('Unauthorized')
    }
  } catch (e) {
    return res.status(401).send({
      message: e.message
    });
  }
}

module.exports = {
  loginUser,
  authorize,
  adminAuthorize
}