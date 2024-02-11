const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

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

module.exports =app;