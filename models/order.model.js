const mongoose = require("mongoose");

const cartModel = require("./cart.model");

const DB_Url = "mongodb://127.0.0.1:27017/online-shop";
const orderSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  timestamp: Number,
  address: String,
  status: {
    type: String,
    default: "pending",
  },
  timestamp: Number,
});

const Order = mongoose.model("order", orderSchema);

exports.addNewOrder = (data) => {
  return new Promise((resolve, reject) => {
    cartModel
      .deleteItem(data.cartId)
      .then(() => mongoose.connect(DB_Url))
      .then(() => {
        data.timestamp = Date.now();
        let order = new Order(data);
        return order.save();
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

exports.getOrdersByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        return Order.find({ userId: userId }, {}, { sort: { timestamp: 1 } });
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

exports.cancelOrder = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => Order.findByIdAndDelete(id))
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

exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        return Order.find({}, {}, { sort: { timestamp: 1 } });
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

exports.editOrder = (id, newStatus) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        return Order.updateOne({ _id: id }, { status: newStatus });
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
