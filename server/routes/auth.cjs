const express = require('express');
const passport = require('passport');

const router = express.Router();

// Initiate Discord login
router.get('/discord', passport.authenticate('discord'));

// Discord callback
router.get(
  '/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:8080/dashboard'); // Redirect to your front-end
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Check if authenticated
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

module.exports = router;
