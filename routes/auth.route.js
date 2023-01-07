const router = require("express").Router();
const bodyParser = require("body-Parser");
const check = require("express-validator").check;
const authController = require("../controllers/auth.controller");
const authGuard = require('./guards/auth.guard')

router.get("/signup", authGuard.notAuth, authController.getSignup);
router.post(
  "/signup",
  authGuard.notAuth,
  bodyParser.urlencoded({ extended: true }),
  check("username").not().isEmpty().withMessage("username is required"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 charachters"),
  check("confirmPassword").custom((value, { req }) => {
    if (value === req.body.password) return true;
    else throw "passwords dont equal";
  }),
  authController.postSignup
);

router.get("/login", authGuard.notAuth, authController.getLogin);
router.post(
  "/login",
  authGuard.notAuth,
  bodyParser.urlencoded({ extended: true }),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("format invalid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 charachters"),
  authController.postLogin
);

router.all("/logout", authGuard.isAuth, authController.logout);

module.exports = router;
