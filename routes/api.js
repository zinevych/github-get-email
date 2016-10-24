'use strict';

var express = require('express');
var router = express.Router();
var githubApi = require('../utils/githubApi');

router.get('/:userName', function (req, res, next) {
  githubApi.init();
  var github = githubApi.api();

  console.log(github);

  Promise.all([
    github.users.getForUser({
      user: req.params.userName
    }),
    github.repos.getForUser({
      user: req.params.userName
    })
  ]).then((resultsArray) => {
    if (resultsArray[1]) {
      return Promise.all(resultsArray[1].map((item, array, index) => {
        return github.repos.getCommits({
          user: req.params.userName,
          repo: item.name,
          author: resultsArray[0].login //need additionally investigate importance of this prop
        })
      }));
    }
  }).then((resultsArray) => {
    res.send(resultsArray);
  }).catch((error) => {
    res.send({
      message: 'Invalid User Name'
    })
  });
});

module.exports = router;
