const express = require('express');
const router = express.Router();
const passport = require('passport');

const Movie = require('../models/Movie');

// Middleware pour vérifier l'authentification avec JWT
const requireAuth = passport.authenticate('jwt', { session: false });

// Create a movie
router.post('/movies', requireAuth, async (req, res) => {
  try {
    const { title, director, genre } = req.body;
    const newMovie = new Movie({ title, director, genre, user: req.user._id });
    await newMovie.save();
    res.status(201).json({ message: 'Movie created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all movies
router.get('/movies', requireAuth, async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user._id });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a movie
router.put('/movies/:id', requireAuth, async (req, res) => {
  try {
    const { title, director, genre } = req.body;
    await Movie.findByIdAndUpdate(req.params.id, { title, director, genre });
    res.json({ message: 'Movie updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a movie
router.delete('/movies/:id', requireAuth, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
