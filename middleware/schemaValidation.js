const { recordSchema } = require('../Model/recordSchema');
const { userSchema } = require('../Model/userSchema')

function validateRecord(req, res, next) {
    const { error } = recordSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    next();
}

function validateUserSchema(req, res, next) {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    next();
}
module.exports = {
    validateRecord,
    validateUserSchema
};