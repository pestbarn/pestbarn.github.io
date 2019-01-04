const renderUntappd = () => {
    axios
        .get('https://dl.dropboxusercontent.com/s/p5c05yrjhmpqel6/Untappd.json')
        .then(result => {
            const beers = result.data;
            const beer = beers.slice(-1)[0];

            getBeer(beer);
        });

    function getBeer(beer) {
        const brewery = beer.brewery_name,
            beerName = beer.beer_name,
            url = beer.checkin_url;

        const elements = ['#brewery', '#beer'];

        elements.map((el, i) => {
            document.querySelector(el).innerText = i === 0 ? brewery : beerName;
        });

        document.getElementById('untappd-url').setAttribute('href', url);
    }
};

const renderMusic = () => {
    axios
        .get('https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=pestbarn&api_key=9ab0d2d4d5ec7e287ea35022d52d09e4&limit=2&format=json')
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
