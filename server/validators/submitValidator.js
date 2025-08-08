const Joi = require('joi');

const namePattern = /^[A-Za-z]+$/;

const submitSchema = Joi.object({
  firstName: Joi.string().pattern(namePattern).required().messages({
    'string.pattern.base': 'First name must contain only letters.',
    'any.required': 'First name is required.'
  }),
  lastName: Joi.string().pattern(namePattern).required().messages({
    'string.pattern.base': 'Last name must contain only letters.',
    'any.required': 'Last name is required.'
  }),
  email: Joi.string().email({ tlds: { allow: false } }).optional().allow(''),
  phoneNumber: Joi.string()
    .pattern(/^[0-9\-().\s]{7,}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Phone number must be valid.'
    }).allow(''),
  supervisor: Joi.string().required().messages({
    'any.required': 'Supervisor is required.'
  })
});

module.exports = { submitSchema };