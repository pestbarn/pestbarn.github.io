const axios = require('axios');

jest.mock('axios');

test('Experience json is fetched', () => {
    const experienceJson = require('../experience.json');
    // eslint-disable-next-line
    const resp = { items: [{ "dateFrom": "2017/10", "dateTo": "(current)", "position": "Frontend developer", "title": "Columbus", "url": "columbusglobal.com/sv/" }, { "dateFrom": "2017/03", "dateTo": "2017/10", "position": "Frontend developer", "title": "Magic by iStone", "url": "magicbyistone.se" }, { "dateFrom": "2015/06", "dateTo": "2017/03", "position": "Frontend developer", "title": "Sportamore", "url": "sportamore.se" }, { "dateFrom": "2012/09", "dateTo": "2016/05", "position": "Festival organizer, developer, designer", "title": "I:O:A" }, { "dateFrom": "2011/05", "dateTo": "2011/09", "position": "Frontend developer & designer", "title": "46elks", "url": "46elks.com" }, { "dateFrom": "2011/01", "dateTo": "2015/05", "position": "Frontend developer & designer", "title": "Freespee", "url": "freespee.com" }, { "dateFrom": "2006/05", "dateTo": "2012/01", "position": "Webmaster, developer, writer", "title": "SwedenMetal" }] };

    axios.get.mockResolvedValue(resp);

    return expect(experienceJson.items).toEqual(resp.items);
});
