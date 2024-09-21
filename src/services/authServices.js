const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async ({ username,email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username,email, password: hashedPassword });
  await newUser.save();
  return { message: 'User created' };
};

exports.login = async ({ username }) => {
  const user = await User.findOne({ username });
  if (user) {
    const token = jwt.sign({ id: user._id }, 'random_secret_string', { expiresIn: '12h' });
    return token;
  } else {
    throw new Error('Something went wrong');
  }
};
