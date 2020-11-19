"use strict";
const { response } = require("express");
const express = require("express");
const routes = express.Router();

const movies = [
  { id: 1, title: "That Thing You Do", year: 1996, animated: false },
  { id: 2, title: "Rocky Horror Picture Show", year: 1975, animated: false },
  { id: 3, title: "The Point", year: 1971, animated: true },
  { id: 4, title: "Borat", year: 2006, animated: false },
];
let nextId = 5;
routes.get("/movies", (req, res) => {
  res.json(movies);
});
routes.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    res.send(`No movie with id ${id} exists`);
  }
});
routes.post("/movies", (req, res) => {
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);

  res.status(201);
  res.json(movie);
});

routes.put("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  let newMovie = req.body;
  if (index !== -1) {
    movies.splice(index, 1);
    movies.push(newMovie);
  }
  res.send();
});

routes.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  res.send();
});
//export routes for use in server.js
module.exports = routes;
