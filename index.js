const fetch = require("node-fetch");
const { Octokit } = require("@octokit/rest");

require('dotenv').config();
const { LASTFM_API_KEY, GH_PERSONAL_TOKEN } = process.env;

// all i wanted was top level async
// i am so sorry for my horrendous code, i'm just trying to spit out something that works
(async () => {





const trackData = await fetch(
    "http://ws.audioscrobbler.com/2.0/?" +
    "method=user.getrecenttracks&user=patheticmustan&format=json&" +
`api_key=${LASTFM_API_KEY}`
);
const trackDataJson = (await trackData.json()).recenttracks;
const songList = trackDataJson.track;



const readmeText = `
# Spotify Stats
## Last Updated ${new Date()})

Oh yeah, the latest and greatest songs listened to!

${
    songList
        .map(v => `- [${v.name}](${v.url}), by ${v.artist["#text"]} (streamed ${v.date["#text"]})`)
        .join("\n")
}
`;



const octokit = new Octokit({
    auth: GH_PERSONAL_TOKEN,
});

const { data: { sha } } = await octokit.request('GET /repos/{owner}/{repo}/contents/{file_path}', {
    owner: "PatheticMustan",
    repo: "testReadme",
    file_path: "README.md"
});


const { response } = await octokit.repos.createOrUpdateFileContents({
    // replace the owner and email with your own details
    owner: "PatheticMustan",
    repo: "testReadme",
    path: "README.md",
    message: "updated README through Github Actions!",
    sha: sha,
    content: Buffer.from(readmeText).toString("base64"),
    author: {
        name: "Mustan Pathetic",
        email: "patheticmustan@gmail.com"
    },
    author: {
        name: "Mustan Pathetic",
        email: "patheticmustan@gmail.com"
    }
});

console.log(response);





})();