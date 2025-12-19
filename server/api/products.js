const express = require("express");
const app = express.Router();
const { fetchProducts } = require("../db/products");
const { isLoggedIn } = require("../middleware/auth");
const { updateProduct } = require("../db/products");

app.get("/", async (req, res, next) => {
  res.send(await fetchProducts());
});

app.patch("/:id", isLoggedIn, async (req, res, next) => {
  res.send(await updateProduct({ id: req.params.id, ...req.body }));
});

module.exports = app;
