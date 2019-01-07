const axios = require('axios');
// const logo = require('./profile');

jest.mock('axios');

test('Profile json is fetched', () => {
    const profileJson = require('../profile.json');
    const resp = 'M2574 6867 c-11 -5 -27 -18 -37 -28 -16 -17 -16 -19 3 -29 11 -6 19 -14 17 -18 -3 -4 3 -19 12 -33 9 -14 30 -49 46 -78 27 -48 38 -56 120 -96 97 -47 163 -69 134 -44 -20 17 -34 69 -19 69 6 0 15 -11 20 -25 16 -42 23 -28 16 32 -4 32 -18 81 -31 110 -14 28 -25 61 -25 71 0 27 -65 82 -95 82 -14 0 -25 -5 -25 -11 0 -5 -5 -7 -11 -4 -18 11 -106 13 -125 2z';

    axios.get.mockResolvedValue(resp);

    return expect(profileJson.profile.eyeLeft).toEqual(resp);
});
