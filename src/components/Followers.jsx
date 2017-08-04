import React from 'react';
import GithubUser from './GithubUser'
var Infinite = require('react-infinite');

class Followers extends React.Component{
    constructor(){
        super();
        this.state = {
            page: 1,
            loading: false,
            followersArray: [],
            infiniteOffset: 100
        };
        //this._fetchData = this._fetchData.bind(this);
    }
    
    //always bounded via  = () => {} this syntax
    _fetchData = () =>{
        //Before doing the AJAX call in fetchData, set the loading state to true
        console.log(this.state.loading, "= Current Loading state")
            this.setState({
                loading: true
             });

        
        const API_TOKEN = 'e681da67137ba7c388bc0d86c25ad9e0e03f2391';
        
        fetch(`https://api.github.com/users/${this.props.params.username}/followers?access_token=${API_TOKEN}&page=${this.state.page}&per_page=50`)
        .then(response => response.json())
        .then(response => {
            //console.log("Array Before concat", this.state.followersArray)
            //console.log("Array After concat", this.state.followersArray.concat(response))
            if(response.length){
                this.setState({
                    //YOU KEEP MISTAKING THIS
                    //EVEN INSIDE setState you gotta use this.setState
                    followersArray: this.state.followersArray.concat(response),
                    page: this.state.page + 1,
                    loading: false,
                });
            }
            else{
                this.setState({
                    infiniteOffset: undefined
                });   
            }
        });
    }
    
    _renderFollower(follower){
        //console.log(follower.id, " = current follower");
        return(
                <li className="followers-list" key={follower.id}>
                    <GithubUser user={follower}/>  
                </li>
        );
    }
    
    
    //Not needed anymore
    //Explained in step 0 of github in infinite scroll section
    //Having this with Infinite makes multiple AJAX calls at the same time
    /*componentDidMount(){
        console.log('In mount')
        this._fetchData();
    }*/
    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.params.username !== this.props.params.username){
            this._fetchData();
        }
    }
    
    
    //does not work if not bounded in Infinite tag
    //Dont need the else
    _loadingSign = (loadState) =>{
        if(loadState){
            return(<div>LOADING</div>)
        }
        else{
            return(<div>LOADING COMPLETE</div>)
        }
    }
    
    
    
/*    _loadingSign=()=>{
        return(<div>LOADING</div>);
    }*/

    render(){
        //In the render method, we're currently checking if this.state.followers is truthy. 
        //We don't need to do that anymore, because we'll always have a list of followers.
        //^^Ask Ziad or TAs about this --always have a list of followers
        //Answer infinite tag takes care of this
        //if the followersArray of state doesnt exist yet, i.e: is undefined
        /*if(!this.state.followersArray){ 
            return (<div className="followers-page">LOADING Followers...</div>);
        }*/
        
        //console.log('this.state.followersArray', this.state.followersArray)
        console.log('In render')
        return(
            <div className="followers-page">
                <h3>Followers of {this.props.params.username}</h3>
                {/*ul tag must be outside infinite or infiite no of ul will be made*/}
                <ul> 
                    <Infinite   isInfiniteLoading={this.state.loading}
                                onInfiniteLoad={this._fetchData}
                                useWindowAsScrollContainer
                                elementHeight={50}
                                infiniteLoadBeginEdgeOffset={this.state.infiniteOffset}
                                loadingSpinnerDelegate={this._loadingSign(this.state.loading)}>
                        {this.state.followersArray.map(this._renderFollower)}
                    </Infinite>
                </ul>
            </div>
        );
    }
}

export default Followers;
/*------------------------------INFINITE tag properties----------------------------------
    The Infinite tag and issues: Their documenation sucks, mistakes in their
    on first time onInfiniteLoad runs fetch when it sees isInfiniteLoading = false.
    The reason we set it to false at the start
    and that the infinte tag is empty, has no data (i.e has no child yet)
    After that it runs when 
    isInfiniteLoading = false and when the scroll exceeds infiniteLoadBeginEdgeOffset.
    That is why to stop the Loading appearing at the end we set infiniteLoadBeginEdgeOffset
    value to undefined when there is no more data to fetch. This is donw in the _fetchData
*/


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