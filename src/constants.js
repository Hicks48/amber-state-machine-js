module.exports = {
    ERROR_MESSAGES: {
        INVALID_CONTEXT_TYPE: 'context must be an object or a map',
        INCOMPLETE_CONTEXT: missingKeys =>
            `context is missing the following keys: ${missingKeys}`,
    },
};
