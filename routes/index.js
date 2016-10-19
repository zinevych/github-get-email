'use strict';

var express = require('express');
var router = express.Router();
var GitHubApi = require('github');

console.log('asasasasasas');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:userName', function(req, res, next) {
  console.log(req.params.userName);


  var github = new GitHubApi({
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


  var a = 'vvvvvv';
  let currentUserName = '';

  github.users.getForUser({
    user: 'nighthavvk'
  }).then((result) => {
    currentUserName = result.name;
    return github.repos.getForUser({
      user: 'nighthavvk'
    });
  }).then((result) => {
    if (result) {
      result.forEach((item, array, index) => {
        github.repos.getCommits({
          user: 'nighthavvk',
          repo: item.name
        }).then((result) => {
          res.send(JSON.stringify({'aaa':'bbb'}));
        });
      })
    }
  });
});

module.exports = router;
