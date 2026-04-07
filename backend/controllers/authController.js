const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_CODE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // If username or password is not provided

    if (!name || !password || !email) {
      return res.status(400).json({
        status: "falied",
        message: "Please Provide Username || Password || email",
      });
    }

    // If user already exists

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(409).json({
        status: "Falied",
        message: "User already exists",
      });
    }

    // New User

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // Password not sent in response for security reasons

    newUser.password = undefined;

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "Success",
      token,
      message: {
        User: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
      stack: err.stack,
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    // Check if email and password exists
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: "Failed",
        message: "Please Provide Email or Password",
      });
    }

    // Check if user exists and password is correct

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(401).json({
        status: "failed",
        message: "Incorrect email or password",
      });
    }

    // Generate the Token

    const token = signToken(user._id);

    // send response
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
        message: "Logged in successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
      stack: err.stack,
    });
  }
};


module.exports.protect = async (req, res, next) => {
  try {
    let token;

    //  Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    //  If no token = block access
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "You are not logged in. Please login to get access.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);

    //  Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "failed",
        message: "User no longer exists.",
      });
    }

    //  Attach user to request
    req.user = currentUser;

    //  Allow request to continue
    next();

  } catch (err) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid token",
    });
  }
};

