import * as Joi from "joi";

// Data model schema describes that phone and zipCode must be number, but it could cause issues, because of JS behaviour:
// for example if phone or zipCode will start with 0 it will not work. (JS will assume that it is octal numeric and will change values);
// According phone validation, we should check if phone is less than 20 digits, but JS max number is 9007199254740991
// so it only 16 digits. If we try to save more, its unsafe number and JS will change values.
// we are not intended to do any math with those values so I changed it to simple strings

export const checkoutSchema: Joi.Schema = Joi.object({
  companyData: Joi.object({
    name: Joi.string().min(2).max(60).required(),

    // changed to string
    phone: Joi.string().min(2).max(20).required(),
  }).required(),
}).required();

export const updateSchema: Joi.Schema = Joi.object({
  customerData: Joi.object({
    firstName: Joi.string().min(2).max(60),
    lastName: Joi.string().min(2).max(60),

    // changed to string
    zipCode: Joi.string().min(5).max(5),
    mail: Joi.string().email(),
  }),
}).required();
