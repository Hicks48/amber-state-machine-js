const uuidv1 = require('uuid/v1');

const subscriptions = new Map();

const subscribe = (topic, callback) => {
    const id = uuidv1();

    if (!subscriptions.get(topic)) {
        subscriptions.set(topic, []);
    }

    subscriptions.get(topic).push({ id, callback });

    return { id, topic };
};

const unsubscribe = ({ id, topic }) => {
    const updatedSubscriptions = subscriptions
        .get(topic)
        .filter(subscription => subscription.id !== id);

    subscriptions.set(topic, updatedSubscriptions);
};

const publish = (topic, data) => {
    subscriptions
        .get(topic)
        .forEach(subscription => subscription.callback(data));
};

const clear = () => subscriptions.clear();

module.exports = {
    subscribe,
    unsubscribe,
    publish,
    clear,
};
