import React from 'react';
import GithubUser from './GithubUser';

class Followers extends React.Component {
    constructor(){
        super();
        this.state = {
        
        }
    }
    
    
    
    componentDidMount() {
        var GITHUB_API_OAUTH = "?access_token=33c223ce254bf2c0af32f264f4819c57d4c2bb6c";
        fetch(`https://api.github.com/users/${this.props.params.username}/followers${GITHUB_API_OAUTH}`)
        .then(response => response.json())
        .then(
            followers => {
                this.setState({
                    followers: followers
                });
            }
        );
    }
    
    render (){
        if (!this.state.followers) {
            return <div>LOADING FOLLOWERS...</div>
            }
            
        return (
            <div className="followers-page">
            
                <h2>Followers of {this.props.params.username}</h2>
                <ul>
                    {this.state.followers.map(follower => {
                        return(
                            <li key={follower.id}>
                                <GithubUser user={follower}/>
                            </li>)
                        })
                    }
                </ul>
            </div>
        );
    }          
}

export default Followers;