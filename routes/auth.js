const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

// REGISTER
router.get('/register', (req, res) => {
  res.render('auth/signup');
});

// creating user
router.post('/register', async (req, res, next) => {
  try {
    const { email, username, password,role } = req.body;
    const user = new User({ email, username,role });
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome!');
      res.redirect('/products');
    });
  } catch (e) {
    req.flash('ono', e.message);
    res.redirect('/register');
  }
});

// LOGIN
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// userr login
router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/products');
  }
);

// LOGOUT
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      req.flash('ono', err.message);
      return res.redirect('/products');
    }
    req.flash("success","Logged Out Successfully!");
    res.redirect("/login");
  });
});

module.exports = router;
