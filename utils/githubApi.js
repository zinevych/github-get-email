var GitHubApi = require('github'),
  github = {};


function init() {
  github = new GitHubApi({
    // optional args
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    //pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    headers: {
      //"user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
    },
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
  });

  // basic
  github.authenticate({
    type: "basic",
    username: 'github.get.email@gmail.com',
    password: 'githubgetemail123456789'
  });
}

function getGithubInstance() {
  return github;
}


module.exports = {
  init: init,
  api: getGithubInstance
};

