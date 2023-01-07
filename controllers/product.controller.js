const productsModel = require("../models/products.model");

exports.getFProduct = (req, res, next) => {
  productsModel.getFirstProduct().then((product) => {
    res.render("product", {
      product: product,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      validationError: req.flash("validationErrors")[0]
    });
  });
};
exports.getProductByHerId = (req, res, next) => {
  // get id
  // get product
  // render
  let id = req.params.id;
  productsModel.getProductById(id).then((product) => {
    res.render("product", {
      product: product,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      validationError: req.flash("validationErrors")[0],
      pageTitle: 'Product'
    });
  });
};
