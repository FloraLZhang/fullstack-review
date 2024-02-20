
const express = require('express');
let app = express();
const helpers = require('../helpers/github.js');
const db = require('../database/index.js');


//middleware to parse json bodies
app.use(express.json());
// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helpers.getReposByUsername(req.body.username, (err, repos) => {
    if(err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    db.save(repos)
    .then(()=> {res.sendStatus(201)})
    .catch((err) => {
      console.error(err);
      res.sendStatus(500)
    })
  })
});

  // const { username } = req.body;
  // axios.post('https://api.someendpoint.com/user/repos', {
  //   username: username
  // })
  // .then(function (response) {
  //   res.json(response.data);
  // })
  // .catch(function (error) {
  //   console.error(error);
  //   res.status(500);
  // });


app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getTopRepos()
    .then(repos =>{
      res.send(repos);
    })
    .catch(err =>{
      console.error(err);
      res.sendStatus(500);
    })

  })




let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

