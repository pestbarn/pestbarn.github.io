const axios = require('axios');
const logo = require('./logo');
const animationTiming = logo.animationTiming;

jest.mock('axios');

test('animationTiming settings', () => {
    expect(animationTiming.elastic(10)).toBe(1);
    expect(animationTiming.swingTo(10)).toBe(2108.2798);
    expect(animationTiming.bounceOut(10)).toBe(619.75);
});

test('Fetching logo.json', () => {
    const logoJson = require('../logo.json');
    const resp = 'm364.502,127.713l-5.198,6.176l-9.756,-8.073l0.884,-0.975l8.889,7.302l4.315,-5.204l0.866,0.774z';

    axios.get.mockResolvedValue(resp);

    return expect(logoJson.logo.suffixLetter4).toEqual(resp);
});
