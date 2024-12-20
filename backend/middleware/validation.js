const { body } = require("express-validator");

const validationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("message").notEmpty().withMessage("Message is required"),
];

module.exports = { validationRules };
