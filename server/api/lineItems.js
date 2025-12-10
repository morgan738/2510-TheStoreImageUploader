const express = require("express");
const { fetchLineItem, createLineItem } = require("../db/lineItems");
const { isLoggedIn } = require("../middleware/auth");
const app = express.Router();

app.get("/", isLoggedIn, async (req, res, next) => {
  res.send(await fetchLineItem(req.user.id));
});

app.post("/", isLoggedIn, async (req, res, next) => {
  res.send(await createLineItem(req.body));
});

module.exports = app;
