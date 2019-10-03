const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/User');
const config = require('../util/config');
const validators = require('../util/validators');

// ! Passport route protection
// passport.authenticate('jwt', {session: false})

// - Login
router.post('/login', (req, res) => {
  User.findOne({ email }).then(user => {
    if (!user) {
      console.log('========= USER COULD NOT BE FOUND TO LOG IN ==========');
      return res
        .status(400)
        .json({ error: 'Credentials could not be matched please try again' });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (isMatch && !err) {
        const token = jwt.sign(user, config.JWT_KEY, {
          expiresIn: '1hr'
        });
        res.status(200).json({ token });
      }
      res
        .status(400)
        .json({ error: 'Credentials could not be matched please try again' });
    });
  });
});

// - Logout
router.post('/logout', (req, res) => {
  req.logOut();
  res.status(418).json({ general: 'user cleared' });
});

// - Create
router.post('/register', (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Please fill out all fields' });
  }
  const newUser = new User({
    username,
    password,
    email
  });

  newUser.save(err => {
    if (err) {
      console.log(err);
      return res.json({
        error: 'an error occurred while trying to save this user'
      });
    }
    res.json({ newUser: 'New user has been created' });
  });
});

module.exports = router;
