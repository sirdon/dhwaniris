const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { password } = req.body;
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({
        error: "User does not exits. Please register.",
      });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(400).json({
        message: "Authentication Failed",
        status: 401,
        success: false,
      });
    }

    new_last_login = user.last_login.getTime();
    user.last_login = Date.now();
    user.is_login = true;
    await user.save();

    const { _id, name, username, last_login } = user;

    timeStamp = Date.now();
    timeStamp = new Date(timeStamp).getTime();
    const token = jwt.sign(
      { _id: user._id, name, username, last_login: new_last_login },
      process.env.JWT_SECRET
    );

    return res.json({
      message: "Login successfull.",
      status: 200,
      success: true,
      token,
      login_id: _id,
      last_login: new_last_login,
      timeStamp,
    });
  } catch (error) {
    console.error(error.message);
    res.send("Server error");
  }
};

exports.logout = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    let user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(400).json({
        error: "User does not exits.",
      });
    }
    user.is_login = false;
    await user.save();
    //add token expire code
    return res.json({
      success: true,
      status: 200,
      message: "Successfully logged out",
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid segment encoding",
      });
    }
    console.error(error.message);
    res.send("Server error");
  }
};
