const Joi = require("joi");

const createStudentSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(30)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters"
    }),

  lastName: Joi.string()
    .trim()
    .min(2)
    .max(30)
    .required()
    .messages({
      "string.empty": "Last name is required"
    }),

  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .messages({
      "string.email": "Invalid email address",
      "string.empty": "Email is required"
    }),

  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/) // Indian phone format
    .required()
    .messages({
      "string.pattern.base": "Phone number must be a valid 10-digit number"
    }),

  DOB: Joi.date()
    .less("now")
    .required()
    .messages({
      "date.less": "DOB must be in the past",
      "date.base": "DOB must be a valid date"
    }),

  gender: Joi.string()
    .valid("Male", "Female", "Other")
    .required()
    .messages({
      "any.only": "Gender must be Male, Female or Other"
    }),

  profilePic: Joi.string()
    .uri()
    .optional()
});

module.exports = {
  createStudentSchema
};