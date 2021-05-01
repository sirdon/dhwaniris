const Child = require("../model/Child");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.createChild = async (req, res) => {
  const {
    name,
    sex,
    dob,
    father_name,
    mother_name,
    district_id,
    photo,
  } = req.body;
  console.log(name, sex, dob, father_name, mother_name, district_id, photo);
  try {
    const newChild = new Child({
      name,
      sex,
      dob,
      father_name,
      mother_name,
      district_id,
      user: userId,
      photo,
    });

    await newChild.save();
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Operation performed successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error child");
  }
};

exports.getChild = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    user = await User.findOne({ _id: decoded._id });
    const child = await Child.find({ user: user._id }).select({
      _id: 1,
      name: 1,
      sex: 1,
      dob: 1,
      father_name: 1,
      mother_name: 1,
      district_id: 1,
      photo: 1,
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Child Profile Detail",
      child_profile: child,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
