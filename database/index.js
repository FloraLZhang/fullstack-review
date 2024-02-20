
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  owner_login: String,
  html_url: {type: String,unique: true},
  stargazers_count: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
 let saveRepos = repos.map(repo => {
    let newRepo = new Repo({
      id: repo.id,
      name: repo.name,
      owner_login: repo.owner_login,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
    });
    return newRepo.save();
  });
    // newRepo.save((err,savedRepo) => {
    //   if (err) {
    //   return console.error(err);
    //   } else {
    //     console.log('New repo saved');
    //     return callback(null,savedRepo);
    //   }
    // })
       // Wait for all save repo to finish
  return Promise.all(saveRepos)
  .then(() => { console.log('All repos saved successfully.') })
  .catch(err => { console.error(err); });
}
//function to get repos from mongodb
let getTopRepos =() => {
  return Repo.find({}).sort('-stargazers_count').limit(25).exec()
}

module.exports.save = save;
module.exports.getTopRepos = getTopRepos;