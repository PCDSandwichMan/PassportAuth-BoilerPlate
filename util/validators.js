const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../util/config');

// - Helpers
const isEmail = email => {
  if (!isEmail) return false;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegex)) return true;
  return false;
};

const isEmpty = string => {
  if (!string) return true;
  if (string.trim() === '') return true;
  return false;
};

// - Validators
exports.validateSignUpData = data => {
  let errors = {};

  // - Email Check
  if (isEmpty(data.email)) errors.email = 'Must not be empty';
  if (!isEmail(data.email)) error.email = 'Must use valid email';

  // - Password Check
  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  if (data.password !== data.confirmPassword) {
    errors.password = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = 'Must not be empty';
  if (isEmail(data.password)) errors.password = 'Must not be empty';

  return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
  }
};


