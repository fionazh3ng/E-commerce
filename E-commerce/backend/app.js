const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Check requests for a token and attach the decoded id to the request
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  try {
    req.user = jwt.verify(token, process.env.JWT);
  } catch {
    req.user = null;
  }
  next();
});

// Backend routes
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
