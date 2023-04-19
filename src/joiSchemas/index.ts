import * as Joi from "joi";

export const checkoutSchema: Joi.Schema = Joi.object({
  companyData: Joi.object({
    name: Joi.string().min(2).max(60).required(),
    phone: Joi.number()
      .integer()
      .positive()
      .custom((value, helpers) => {
        const { error } = Joi.string().min(2).max(20).validate(value.toString());
        if (error) {
          return helpers.message({ custom: error.details[0].message });
        }
        return value;
      })
      .required(),
  }).required(),
}).required();

export const updateSchema: Joi.Schema = Joi.object({
  customerData: Joi.object({
    firstName: Joi.string().min(2).max(60),
    lastName: Joi.string().min(2).max(60),
    zipCode: Joi.number().min(10000).max(99999),
    mail: Joi.string().email(),
  }),
}).required();
