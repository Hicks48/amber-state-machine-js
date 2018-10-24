const Joi = require('joi');

const schema = Joi.object.keys({
    name: Joi.string().required(),
    automate_name: Joi.string().required(),
    current_states: Joi.array()
        .items(Joi.string())
        .required(),
});

const validate = drive => Joi.validate(drive, schema);

module.exports = {
    validate,
};
