const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { use } = require("../routes/reg");
exports.register = async (req, res) => {
  const { username, password, name } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        error: "Please enter all fields",
      });
    }
    user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({
        error: "User already exits. Please login.",
      });
    }

    //hash the password
    const salt = await bcrypt.genSalt();
    const hash_password = await bcrypt.hash(password, salt);

    //save the user account to db

    user = new User({
      name: name || username,
      password: hash_password,
      username,
    });
    const savedUser = await user.save();

    //sign the token
    jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

    //send the token in a HTTP-only cookie
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
