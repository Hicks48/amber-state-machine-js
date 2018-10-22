const events = require('./events');

const testTopic = 'test-topic';
const testData = { transmission: 'testing data transmission...' };

describe('events', () => {
    afterEach(() => {
        events.clear();
    });

    it('should be able to subscribe to topic', () => {
        events.subscribe(testTopic, jest.fn());
    });

    it('should get subscribers should get events from publishers', () => {
        const callback = jest.fn();
        events.subscribe(testTopic, callback);
        events.publish(testTopic, testData);

        expect(callback).toHaveBeenCalledWith(testData);
    });

    it('should be able to unsubscribe from topic', () => {
        const callback = jest.fn();
        const subscription = events.subscribe(testTopic, callback);
        events.unsubscribe(subscription);
        events.publish(testTopic, testData);

        expect(callback).not.toHaveBeenCalled();
    });

    it('other subscribers should get events from publishers after one more subscribes', () => {
        const subscriber1 = jest.fn();
        const subscriber2 = jest.fn();

        events.subscribe(testTopic, subscriber1);
        events.subscribe(testTopic, subscriber2);

        events.publish(testTopic, testData);

        expect(subscriber1).toHaveBeenCalledWith(testData);
        expect(subscriber2).toHaveBeenCalledWith(testData);
    });
});
