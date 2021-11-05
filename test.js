const fetch = require("node-fetch");
const { Octokit } = require("@octokit/rest");

require("dotenv").config();
const { LASTFM_API_KEY, GH_PERSONAL_TOKEN } = process.env;

const octokit = new Octokit({
    auth: GH_PERSONAL_TOKEN,
});

(async () => {
    
    try {
    const readmeFile = await octokit.request("GET /repos/{owner}/{repo}/contents/{file_path}", {
        owner: "PatheticMustan",
        repo: "testReadme",
        file_path: "test.md"
    });
    console.log(readmeFile);
    } catch (e) {
        console.log("ouch!")
    } 

    //const sha = readmeFile.data.sha;
})();