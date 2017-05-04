import React from 'react';
import GithubRepo from './GithubRepo';

class Repos extends React.Component {
    constructor(){
        super();
        this.state = {
        
        }
    }
    
    
    
    componentDidMount() {
        var GITHUB_API_OAUTH = "?access_token=33c223ce254bf2c0af32f264f4819c57d4c2bb6c";
        fetch(`https://api.github.com/users/${this.props.params.username}/repos?direction=desc${GITHUB_API_OAUTH}`)
        .then(response => response.json())
        .then(
            repos => {
                this.setState({
                    repos: repos
                });
            }
        );
    }
    
    render (){
        if (!this.state.repos) {
            return <div>LOADING REPOS...</div>
            }
            
        return (
            <div className="repos-page">
            
                <h2>{this.props.params.username}'s repos</h2>
                <ul>
                    {this.state.repos.map(repo => {
                        return(
                            <li className="githubRepo" key={repo.id}>
                                <GithubRepo repo={repo}/>
                            </li>)
                        })
                    }
                </ul>
            </div>
        );
    }          
}

export default Repos;