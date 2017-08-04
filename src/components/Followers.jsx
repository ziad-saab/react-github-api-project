import React from 'react';
import { Link } from 'react-router';
import GithubUser from './GithubUser';

class Followers extends React.Component {
    
    constructor() {
        super();
        this.state = {
            page: 1, 
            loading: false, 
            followers: []
        };
    }
    
    fetchData() {
        this.setState = {
            loading: true
        }
        //console.log(this)
        //https://api.github.com/users/USER/followers?access_token=XXX&page=1&per_page=50
        fetch(`https://api.github.com/users/${this.props.params.username}/followers?&page=${this.state.page}&per_page=50`)
        .then(response => response.json())
        // this.setState({list: this.state.list.concat([newObject])});
        .then(
            followers => {
                this.setState({
                    followers: this.state.followers.concat([]), 
                    loading: false, 
                    page: this.state.page + 1
                    
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
        if (!this.state.followers) {
            return <div>LOADING FOLLOWERS...</div>;
        }
        //console.log(this.state.followers.object.username);
        return (
            <div className="followers-page">
                <h3>Followers of {this.props.params.username}</h3>
                <div className="followersMap">
                    {this.state.followers.map(follower => { 
                    return(
                        <div className="FollowerDiv" key={follower.id}>
                            <GithubUser user={follower.login} avatar_url={follower.avatar_url} img src={follower.avatar_url} />  
                        </div>
                        )
                    })}
                </div>    
            </div>
        );
    }
}
export default Followers;