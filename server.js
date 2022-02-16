require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const product = require("./model/productSchema");
const User = require("./model/UserSchema");

server.use(express.json()); //gives access to the body i.e translate from json  to javascript

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("connected to database");
    } else {
      console.log(`error connected to the database ${err}`);
    }
  }
);

server.listen(process.env.PORT, () =>
  console.log("connected to the server....")
);

server.post("/signup", async (req, res) => {
  try {
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let saltRound = 10;
    let hash = bcrypt.hashSync(password, saltRound);

    const user = new User({ email, name, password: hash });

    await user.save();
    res.json(`singUp created successfully`);
  } catch (error) {
    res.json(error.message);
  }
});

server.post("/login", async (req, res) => {
  // let email = req.body.email;
  // let password = req.body.password;
  // let user =await User.findOne({ email:email });
  let user = await User.findOne({ email:req.body.email });
    console.log(user);
  //console.log(email,password);
  if (user) {
    let checkPassword=bcrypt.compareSync(req.body.password,user.password);

    if (checkPassword) {
      res.json("login Successful");
    }else{
      res.json("login failed")
    }
  } else {
    res.json("You dont Have an Account,Sign Up First");
  }
});

server.patch("/product", async (req, res) => {
  res.send("update Product");
});

server.delete("/product/:productid", async (req, res) => {
  res.send("delete Product");
});

//
