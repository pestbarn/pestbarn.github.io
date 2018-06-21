/* global axios */

const renderUntappd = () => {
    axios
        .get('https://dl.dropboxusercontent.com/s/f7ustvn6xp1bo6h/Untappd.json')
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

const renderGithub = () => {
    axios
        .get('https://api.github.com/repos/pestbarn/obsidian/stats/commit_activity')
        .then(result => {
            const commits = result.data;
            const n = commits.map(t => t.total);
            const number = n.reduce((n, i) => n + i);
            const total = Object.keys(commits).length;

            let average = number / total;

            average = Math.round(average * 10) / 10;

            getGit(average);
        });

    function getGit(commits) {
        const number = commits;

        const element = document.getElementById('github-commits');

        element.innerText = `latest project: ${number}`;
    }
};

(function() {
    renderUntappd();
    renderMusic();
    renderGithub();
})();
