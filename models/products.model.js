const mongoose = require("mongoose");

const DB_Url = "mongodb://127.0.0.1:27017/online-shop";

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  image: String,
  price: Number,
});
const Product = mongoose.model("product", productSchema);


exports.addNewProduct = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        let newProduct = new Product(data);
        return newProduct.save();
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getAllProducts = () => {
  // connect to db
  // get products
  // disconnect
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        return Product.find({});
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.getProductByCategory = (category) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        return Product.find({ category: category });
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        return Product.findById(id);
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.getFirstProduct = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_Url)
      .then(() => {
        return Product.findOne({});
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
