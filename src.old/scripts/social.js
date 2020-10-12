const axios = require('axios');
const env = require('../../.env.js');
const untappd_clientID = env.config.UNTAPPD_CLIENTID;
const untappd_clientSecret = env.config.UNTAPPD_CLIENTSECRET;
const lastfm_key = env.config.LASTFM_KEY;

const renderUntappd = () => {
    axios
        .get(`https://api.untappd.com/v4/user/beers/pestbarn?client_id=${untappd_clientID}&client_secret=${untappd_clientSecret}`)
        .then(result => {
            const beers = result.data.response.beers.items[0];
            getBeer(beers);
        });

    function getBeer(beer) {
        const brewery = beer.brewery.brewery_name,
            beerName = beer.beer.beer_name;

        const elements = ['#brewery', '#beer'];

        elements.map((el, i) => {
            document.querySelector(el).innerText = i === 0 ? brewery : beerName;
        });

        document.getElementById('untappd-url').setAttribute('href', 'https://untappd.com/user/pestbarn');
    }
};

const renderMusic = () => {
    axios
        .get(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=pestbarn&api_key=${lastfm_key}&limit=2&format=json`)
        .then(result => {
            const tracks = result.data.recenttracks.track;
            const track = tracks.slice(-1)[0];

            getTrack(track);
        });

    function getTrack(track) {
        const trackArtist = track.artist['#text'],
            trackName = track.name,
            trackUrl = track.url;

        const elements = ['#lastfm-artist', '#lastfm-track'];

        elements.map((el, i) => {
            document.querySelector(el).innerText = i === 0 ? trackArtist : trackName;
        });

        document.getElementById('lastfm-url').setAttribute('href', trackUrl);
    }
};

(function() {
    renderUntappd();
    renderMusic();
})();
