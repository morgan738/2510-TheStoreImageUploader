const express = require("express");
const { isLoggedIn } = require("../middleware/auth");
const { fetchOrders, updateOrder } = require("../db/orders");
const app = express.Router();

app.get("/", isLoggedIn, async (req, res, next) => {
  res.send(await fetchOrders(req.user.id));
});

app.put("/:id", isLoggedIn, async (req, res, next) => {
  res.send(await updateOrder({ ...req.body, id: req.params.id }));
});

module.exports = app;
