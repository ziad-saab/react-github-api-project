import React from 'react';
import GithubUser from './GithubUser'
var Infinite = require('react-infinite');

class Followers extends React.Component{
    constructor(){
        super();
        this.state = {
            page: 1,
            loading: false,
            stop:false,
            followersArray: []
        };
        //this._fetchData = this._fetchData.bind(this);
    }
    
    //always bounded via  = () => {} this syntax
    _fetchData = () =>{
        //Before doing the AJAX call in fetchData, set the loading state to true
        console.log(this.state.loading, "= Current Loading state")
        //if(!this.state.stop){
            this.setState({
                loading: true
             });
//        }
/*        else{
            this.setState({
                loading: false
            });
        }*/
        
        const API_TOKEN = 'e681da67137ba7c388bc0d86c25ad9e0e03f2391';
        //if(!this.state.stop){
            fetch(`https://api.github.com/users/${this.props.params.username}/followers?access_token=${API_TOKEN}&page=${this.state.page}&per_page=5`)
            .then(response => response.json())
            .then(response => {
                //the response is an array of objects, each object being a follower
                console.log(response, "the response from api");
                console.log(this.state.page, " = Current page");
/*                if(this.state.page !== 1 && response.length === 0) {
                    this.setState({
                        stop: true
                    });                     
                }
                else {*/
                    console.log("Array Before concat", this.state.followersArray)
                    console.log("Array After concat", this.state.followersArray.concat(response))
    
                    this.setState({
                        //YOU KEEP MISTAKING THIS
                        //EVEN INSIDE setState you gotta use this.setState
                        followersArray: this.state.followersArray.concat(response),
                        page: this.state.page + 1,
                        loading: false,
                        stop:false
                    });
                //}
            });
        //}
    }
    
    _renderFollower(follower){
        //console.log(follower.id, " = current follower");
        return(
                <li className="followers-list" key={follower.id}>
                    <GithubUser user={follower}/>  
                </li>
        );
    }
    
/*    componentDidMount(){
        console.log('In mount')
        this._fetchData();
    }*/
    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.params.username !== this.props.params.username){
            this._fetchData();
        }
    }
    
    _loadingSign = (loadState) =>{
        if(loadState){
            return(<div>LOADING</div>)
        }
        else{
            return(<div>LOADING COMPLETE</div>)
        }
    }

    render(){
        //In the render method, we're currently checking if this.state.followers is truthy. 
        //We don't need to do that anymore, because we'll always have a list of followers.
        //^^Ask Ziad or TAs about this --always have a list of followers 
        //if the followersArray of state doesnt exist yet, i.e: is undefined
        /*if(!this.state.followersArray){ 
            return (<div className="followers-page">LOADING Followers...</div>);
        }*/
        
        //console.log('this.state.followersArray', this.state.followersArray)
        console.log('In render')
        return(
            <div className="followers-page">
                <h3>Followers of {this.props.params.username}</h3>
                <ul> 
                    <Infinite   isInfiniteLoading={this.state.loading}
                                onInfiniteLoad={this._fetchData}
                                useWindowAsScrollContainer
                                elementHeight={30}
                                infiniteLoadBeginEdgeOffset={50}
                                loadingSpinnerDelegate={this._loadingSign(this.state.loading)}>
                            { this.state.followersArray.map(this._renderFollower)}
                    </Infinite>
                    
                </ul>
            </div>
        );
    }
}

export default Followers;

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