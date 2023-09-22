const Joi = require('joi');

const recordSchema = Joi.object({
    name: Joi.string().required(),
    salary: Joi.string().required(),
    currency: Joi.string(),
    department: Joi.string().required(),
    on_contract: Joi.string(),
    sub_department: Joi.string().required(),
});
module.exports = {
    recordSchema,
};