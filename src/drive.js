const Joi = require('joi');

const schema = Joi.object.keys({
    name: Joi.string().required(),
    automate_name: Joi.string().required(),
    current_states: Joi.array()
        .items(Joi.string())
        .required(),
});

module.exports = {};
