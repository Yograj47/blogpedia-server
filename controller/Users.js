const User = require("../model/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Empty Field Deteched",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email exist",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const data = {
      name: name,
      email: email,
      password: encryptedPassword,
    };

    const user = await User.create(data);
    res.status(201).json({
      message: "User Created",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  createUser,
};
