import React from 'react';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    <ul>
      {repos.map(repo => (
        <li key={repo.html_url}>
         <a href={repo.html_url}>{repo.name}</a>
         {'- Stars:'}{repo.stargazers_count}
         </li>
      ))}
    </ul>
  </div>
)

export default RepoList;