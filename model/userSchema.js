const  Mongoose= require("mongoose");

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique:true
  },
  password: {
    type: String,
  },
});

const user = Mongoose.model("user", userSchema);
module.exports = user;
