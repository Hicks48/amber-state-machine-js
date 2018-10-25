const Joi = require('joi');
const _ = require('lodash');
const { ERROR_MESSAGES } = require('./constants');

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

const build = (blueprint, context) => {
    const { error } = Joi.validate(blueprint, automateSchema);
    if (error) {
        throw new Error(error);
    }

    if (!(_.isObject(context) || _.isMap(context))) {
        throw Error(ERROR_MESSAGES.INVALID_CONTEXT_TYPE);
    }

    const contextKeys = _.isObject(context)
        ? Object.keys(context)
        : context.keys();

    const missingKeys = _.difference(
        blueprint.transitions.map(transition => transition.isOpen),
        contextKeys
    );

    if (!_.isEmpty(missingKeys)) {
        throw new Error(ERROR_MESSAGES.INCOMPLETE_CONTEXT(missingKeys));
    }

    return {
        ...blueprint,
        transitions: blueprint.transitions.map(transition => ({
            ...transition,
            isOpen: context[transition.isOpen],
        })),
    };
};

module.exports = {
    build,
};
