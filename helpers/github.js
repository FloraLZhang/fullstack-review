
const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(options.url, { headers: options.headers })
  .then((response) => callback(null, response.data)) // pass response.data to the callback
  .catch((err) => callback(err)); // pass error to the callback
}

module.exports.getReposByUsername = getReposByUsername;