const mongoose = require("mongoose");
let { ObjectId } = require("mongodb");

const DB_Url = "mongodb://127.0.0.1:27017/online-shop";

const cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  timestamp: Number,
});

const CartItem = mongoose.model("cart", cartSchema);

exports.addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        let item = new CartItem(data);
        return item.save();
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
exports.getItemsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        return CartItem.find(
          { userId: userId },
          {},
          { sort: { timestamp: 1 } }
        );
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.editItem = (id, newData) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        return CartItem.updateOne({ _id: id }, newData);
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => CartItem.findByIdAndDelete(id))
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
exports.getItemById = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => CartItem.findById(id))
      .then((item) => {
        mongoose.disconnect();
        resolve(item);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
