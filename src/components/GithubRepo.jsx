import React from 'react';
// import { Link } from 'react-router';
var FontAwesome = require('react-fontawesome');

class GithubRepo extends React.Component {

    render() {
        return (
        
            
            <div className="githubReposDisplay">
                <a href={`https://github.com/${this.props.name}`} className="githubRepoLink" >
                <h2 className="githubRepoName">{this.props.name}</h2>
                </a>
                <a href={`https://github.com/${this.props.name}/stargazers`} className="repoStargazers">
                <p>{this.props.stargazers} <FontAwesome name='star' /></p> 
                </a>    
            </div>    
        );
    }
}
export default GithubRepo;
