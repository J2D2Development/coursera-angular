/* eslint-disable */
describe('Odds detecting', function() {
    it('Should Recognize an Odd Number', function() {
        var result = isOdd(5);
        expect(result).toBe(true);
    });

    it('Should not return true on an even number', function() {
        expect(isOdd(16)).toBe(false);
    });
});

describe('Evens detecting', function() {
    it('Should recognize an Even Number', function() {
        expect(isEven(8)).toBe(true);
    });

    it('Should not return true on an Odd Number', function() {
        expect(isEven(99)).toBe(false);
    });
});