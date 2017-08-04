import React from 'react';
// import { Link } from 'react-router';
import GithubUser from './GithubUser';

class Following extends React.Component {
    
    constructor() {
        super();
        this.state = {};
    }
    
    fetchData() {
        //console.log(this)
        fetch(`https://api.github.com/users/${this.props.params.username}/following`)
        .then(response => response.json())
        .then(
            following => {
                this.setState({
                    following: following 
                });
            }
        )
        // .then(
        //     console.log(this)
        // )
    }
    
     componentDidMount() {
        this.fetchData();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.username !== this.props.params.username) { 
          this.fetchData();
      }
    }
    
    render() {
        if (!this.state.following) {
            return <div>LOADING FOLLOWING...</div>;
        }
        //console.log(this.state.followers.object.username);
        return (
            <div className="following-page">
                <h3>Followed by {this.props.params.username}</h3>
                <div className="followingMap">
                    {this.state.following.map(followed => { 
                    return(
                        <div key={followed.id}>
                            <GithubUser user={followed.login} avatar_url={followed.avatar_url} img src={followed.avatar_url} />  
                            
                          
                        </div>
                        )
                    })}
                      
                  
                </div>    
            </div>
        );
    }
}
export default Following;