
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

const App = () => {

  const [repos, setRepos] = useState([]);

  useEffect(()=> {
    axios.get('/repos')
    .then((response) => {
      setRepos(response.data);
    })
    .catch((error) => console.log('Failed to fetch repos:', error));
  },[])

  const search = (term) => {
    console.log(`${term} was searched`);
    axios.post('/repos',{username: term})
    .then(() =>{
      //fetch the latest top25 repos after post without refreshing page
      axios.get('/repos')
      .then((response) => {
        setRepos(response.data);
      })
      .catch((error) => console.error(error));
    })
    .catch((err) => console.error('Failed to add repos:', err));
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));