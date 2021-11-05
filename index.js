require('dotenv').config();

const { LASTFM_API_KEY, GH_PERSONAL_TOKEN } = process.env;

console.log(typeof LASTFM_API_KEY);

const tracks =
    (await
        (await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=patheticmustan&api_key=${process.env.LASTFM_API_KEY}&format=json`)
    ).json()).recenttracks;

const songList = tracks.track.map(v => `${v.name} - ${v.artist["#text"]}`);

console.log(songList.join("\n"));