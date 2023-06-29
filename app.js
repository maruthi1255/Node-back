const express = require("express");
const app = express();
const cors = require('cors');

//app.use(cors({origin: ["http://localhost:3000"]}));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getMessage", (req, res) => {
  res.send({message: "New message"});
  res.header('Access-Control-Allow', "http://localhost:3000");
  res.header('Access-Control-Methods', "GET, POST,PUT, DELETE");
  res.header('Access-Control-Headers', "Content-Type, Authorization");
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));