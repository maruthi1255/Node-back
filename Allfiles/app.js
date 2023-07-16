require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const {MongoClient} = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//const client = MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const path = __dirname + process.env.STATIC_FILES;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const contactSchema = {
  email: String,
  query: String,
};
  
const Contact = mongoose.model("Contact", contactSchema);
const contact = new Contact({
  email: "sd434@gmail.com",
  query: "Query",
});
  
const Demo = mongoose.model("Demo", {
  message: String ,
  mobile:  String,
  companyName: String,
  jobTitle: String,
  firstName: String,
  lastName: String,
  email: String
});

//contact.save();

app.use(express.static(path));
app.use(cors({origin: [process.env.ALLOW_CLIENT_URL]}));
app.get("/", (req, res) => {
  res.sendFile(path+'index.html');
});
console.log(path);
app.get("/getMessage", (req, res) => {

  res.header('Access-Control-Allow', process.env.ALLOW_CLIENT_URL);
  res.header('Access-Control-Methods', "GET, POST,PUT, DELETE");
  res.header('Access-Control-Headers', "Content-Type, Authorization");
  res.send({message: "New message"});
});
app.post("/sendMessage", (req, res) => {

  res.header('Access-Control-Allow', process.env.ALLOW_CLIENT_URL);
  res.header('Access-Control-Methods', "GET, POST,PUT, DELETE");
  res.header('Access-Control-Headers', "Content-Type, Authorization, Accept");
  console.log(req.body);
  const demoForm = new Demo({
  ...req.body
  });
 
  try {
    demoForm.save();
    res.sendStatus(200);
  } catch (error) {
    response.status(500).send(error);
  }
});

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));