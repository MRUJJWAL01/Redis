const express = require("express");
const authRoute = require("./routes/auth.route");
const { checheIntance } = require("./services/cache.service");
const cookie = require('cookie-parser');

const app = express();
app.use(cookie());
app.use(express.json());
app.use("/api/auth",authRoute);
module.exports = app;