const Joi = require('joi');

const transitionSchema = Joi.object().keys({
    from: Joi.string().required(),
    to: Joi.array()
        .items(Joi.string())
        .required(),
    isOpen: Joi.string().required(),
});

const automateSchema = Joi.object().keys({
    name: Joi.string().required(),
    start_states: Joi.array()
        .items(Joi.string())
        .required(),
    end_states: Joi.array()
        .items(Joi.string())
        .required(),
    transitions: Joi.array()
        .items(transitionSchema)
        .required(),
});

const validate = automate => Joi.validate(automate, automateSchema);

module.exports = {
    validate,
};
