require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const server = express();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, 
    useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("You are connected to database");
    } else {
      console.log(`error connecting To database ${err}`);
    }
  }
);
const userSchema = require("./model/userSchema");
server.use(userSchema)

server.listen(process.env.PORT, () =>
  console.log(`server listening on port ${process.env.PORT}`)
);

server.use(express.json()); //translates json file to javascript //to the body

// const users = {
  // "paul@example.com": {
    // name: "Paul",
    // password: "$2b$12$V8Za0U7tJl9sCd9f2IjOGOhtwWbXjbOb/WC9iW/St92ME3.SypBza",
  // },
// };


server.post("/users", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const saltedRounds = 12;
  let hash = bcrypt.hashSync(password, saltedRounds);
  // console.log(`new Hash`, hash);
  try {
    const user = new User({ email, password:hash });
    user.save();
    res.json("Users created"); //You Can Also Write A Message

  } catch (error) {
    console.log(`could not create new users${error}`);
  }
});


server.post("/signup", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const saltedRounds = 12;
  let hash = bcrypt.hashSync(password, saltedRounds);
  
  try {
    const user = new User({ email, password:hash });
    user.save();

    res.json("sing Up succeded"); //You Can Also Write A Message

  } catch (error) {
    console.log(`could not create new user${error}`);
  }
});

server.post("/auth", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let hash = users[email].password;

  let result = bcrypt.compareSync(password, hash);

  console.log(`Your Result Is`, result);
  res.json(result);
});

//This  Part belongs to the server
server.use((error, req, res, next) => {
  console.log(error);
  res.status(500).end();
});
