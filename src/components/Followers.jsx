import React from 'react';
import GithubUser from './GithubUser'

class Followers extends React.Component{
    constructor(){
        super();
        this.state = {};
    }
    
    _fetchData() {
        //this.props.params.username is the parameter username 
        //from the url we are on, i.e. /user/:username 
        fetch(`https://api.github.com/users/${this.props.params.username}/followers`)
        .then(response => response.json())
        .then(response => {
            //the response is an array of objects, each object being a follower
            console.log(response, "the response from api")
                this.setState({
                    followersArray: response
                });
            }
        );
    }
    
    _renderFollower(follower){
        return(
                <li className="followers-list" key={follower.id}>
                    <GithubUser user={follower}/>  
                </li>
        );
    }
    
    /*
    Read the github page for the this repo to understand why we need componentDidUpdate
    In Step 6: a while bug has appeared. Lazy me wont google it, its bookmarked
    EDIT: I will just put it here
    ----------------
    User is on / and does a search for "gaearon"
    User gets redirected to /user/gaearon and React Router mounts an instance of the User component, 
    passing it "gaearon" as this.props.params.username. The User component's componentDidMount 
    method kicks in and fetches data with AJAX
    User clicks on FOLLOWERS, gets redirected to /users/gaearon/followers. 
    React Router keeps the instance of User mounted, and passes it a new instance of Followers as this.props.children. 
    The Followers instance is mounted and its componentDidMount kicks in, fetching the followers data.
    User clicks on one follower called "alexkuz" and the URL changes to /users/alexkuz. 
    React Router does not mount a new User instance. Instead, it changes the params prop of the existing 
    User instance to make it {username: "alexkuz"}.
    Since componentDidMount of User is not called, no AJAX call occurs.
    To fix this bug, follow the same instructions you did in yesterday's workshop:
    -----------------
    Move the logic from componentDidMount to another method called fetchData (above)
    Call fetchData from componentDidMount
    Implement componentDidUpdate and call fetchData again but conditionally, only if the username prop has changed.
    */
    componentDidMount(){
        this._fetchData();
    }
    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.params.username !== this.props.params.username){
            this._fetchData();
        }
    }

    render(){
        //if the followersArray of state doesnt exist yet, i.e: is undefined
        if(!this.state.followersArray){ 
            return (<div className="followers-page">LOADING Followers...</div>);
        }
        return(
            <div className="followers-page">
                <h3>Followers of {this.props.params.username}</h3>
                <ul>
                    {/*_renderFollower will use the github user component*/}
                    {this.state.followersArray.map(this._renderFollower.bind(this))} 
                </ul>
            </div>
        );
    }
}

export default Followers;