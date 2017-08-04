import React from 'react';
// import { Link } from 'react-router';

class GithubRepo extends React.Component {

    render() {
        // console.log(this)
        return (
        
            
            <div className="githubReposDisplay">
                <a href={`https://github.com/${this.props.name}`} className="githubRepoLink" >
                <h2 className="githubRepoName">{this.props.name}</h2>
                </a>
                <a href={`https://github.com/${this.props.name}/stargazers`}>
                <p>{this.props.stargazers} stargazers </p> 
                </a>    
            </div>    
            
       
        );
        // console.log(this.githubRepoLink)
    }
}
export default GithubRepo;
