const { recordSchema } = require('../Model/recordSchema');

function validateRecord(req, res, next) {
    const { error } = recordSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    next();
}

module.exports = {
    validateRecord,
};