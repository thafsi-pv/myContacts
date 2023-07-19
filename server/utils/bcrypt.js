const bcrypt = require("bcrypt");

const SALT = 10;

const hashPassword = (password) => {
  return bcrypt.hash(password, SALT);
};

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };
