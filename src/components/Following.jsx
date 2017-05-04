import React from 'react';
import GithubUser from './GithubUser';

class Following extends React.Component {
    constructor(){
        super();
        this.state = {
        
        }
    }
    
    
    
    componentDidMount() {
        fetch(`https://api.github.com/users/${this.props.params.username}/following`)
        .then(response => response.json())
        .then(
            following => {
                this.setState({
                    following: following
                });
            }
        );
    }
    
    render (){
        if (!this.state.following) {
            return <div>LOADING FOLLOWING...</div>
            }
            
        return (
            <div className="following-page">
            
                <h2>Followed by {this.props.params.username}</h2>
                <ul>
                    {this.state.following.map(following => {
                        return(
                            <li key={following.id}>
                                <GithubUser user={following}/>
                            </li>)
                        })
                    }
                </ul>
            </div>
        );
    }          
}

export default Following;