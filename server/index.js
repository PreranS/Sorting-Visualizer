const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);

// Serve static files from the React build (client/build)
app.use(express.static(path.join(__dirname, '../client/build')));

// Fallback route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// server.listen(3000, '0.0.0.0');
app.listen(3000, '0.0.0.0', () => {
  console.log("Listening on port 3000");
});
