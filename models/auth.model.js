const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DB_Url = "mongodb://127.0.0.1:27017/online-shop";

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  }, //for Admin
});
const User = mongoose.model("user", userSchema);

exports.createNewUser = (username, email, password) => {
  // check if email exist
  // yes ===> error
  // no  ===> create new account
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("email is used");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hashedPassword) => {
        let user = new User({
          username: username,
          email: email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.login = (email, password) => {
  // check for email
  // no ===> error
  // yes ==> check for password
  // no ===> error
  // yes ==> set session
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => User.findOne({ email: email }))
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("There is no user matches this email");
        } else {
          bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject("password is incorrect");
            } else {
              mongoose.disconnect();
              resolve({ id: user._id, isAdmin: user.isAdmin });
            }
          });
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
