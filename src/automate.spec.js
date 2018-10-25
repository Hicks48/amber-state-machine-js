const Automate = require('./automate');
const { ERROR_MESSAGES } = require('./constants');

const baseBluePrint = {
    name: 'test_automate',
    start_states: ['even'],
    end_states: [],
    transitions: [
        {
            from: 'even',
            to: ['odd'],
            isOpen: 'is_odd',
        },
        {
            from: 'odd',
            to: ['even'],
            isOpen: 'is_even',
        },
    ],
};

const isOdd = n => n % 2 !== 0;
const isEven = n => n % 2 === 0;

const baseContext = { is_odd: isOdd, is_even: isEven };

describe('automate', () => {
    describe('build', () => {
        it('should build automate with valid bluerint and context', () => {
            const automate = Automate.build(baseBluePrint, baseContext);
            expect(automate).toHaveProperty('name');
            expect(automate).toHaveProperty('start_states');
            expect(automate).toHaveProperty('end_states');
            expect(automate).toHaveProperty('transitions');

            expect(automate.transitions[0]).toHaveProperty('from');
            expect(automate.transitions[0]).toHaveProperty('to');
            expect(automate.transitions[0]).toHaveProperty('isOpen');
            expect(automate.transitions[0].isOpen).toEqual(isOdd);

            expect(automate.transitions[1]).toHaveProperty('from');
            expect(automate.transitions[1]).toHaveProperty('to');
            expect(automate.transitions[1]).toHaveProperty('isOpen');
            expect(automate.transitions[1].isOpen).toEqual(isEven);
        });

        it('should throw with invalid blueprint', () => {
            const bp = { ...baseBluePrint, end_states: undefined };
            expect(() => {
                Automate.build(bp, baseBluePrint);
            }).toThrow();
        });

        it('should throw when is given complete context', () => {
            expect(() => {
                Automate.build(baseBluePrint, { is_odd: isOdd });
            }).toThrow();
        });

        it('should throw when is given context of wrong type', () => {
            expect(() => {
                Automate.build(baseBluePrint, ['array context']);
            }).toThrow();
        });
    });
});
