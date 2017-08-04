import React from 'react';
import GithubUser from './GithubUser'
var Infinite = require('react-infinite');

const API_TOKEN = 'e681da67137ba7c388bc0d86c25ad9e0e03f2391';

class Following extends React.Component{
    constructor(){
        super();
        this.state = {
            page: 1,
            loading: false,
            followingArray: [],
            infiniteOffset: 100
        };
    }
    
    //always bound
    _fetchData = () => {
        this.setState({
            loading: true
        });
        //this.props.params.username is the parameter username 
        //from the url we are on, i.e. /user/:username
        fetch(`https://api.github.com/users/${this.props.params.username}/following?access_token=${API_TOKEN}&page=${this.state.page}&per_page=50`)
        .then(response => response.json())
        .then(response => {
            //the response is an array of objects, each object being a follower
            if(response.length){
                this.setState({
                    //YOU KEEP MISTAKING THIS
                    //EVEN INSIDE setState you gotta use this.setState
                    followingArray: this.state.followingArray.concat(response),
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
    
    _renderFollowing(follower){
        return(
                <li className="followers-list" key={follower.id}>
                    <GithubUser user={follower}/>  
                </li>
        );
    }

//Having this with 
/*    componentDidMount(){
        this._fetchData();
    }*/
    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.params.username !== this.props.params.username){
            this._fetchData();
        }
    }
    
    _loadingSign = (loadState) =>{
        if(loadState){
            return(<div>LOADING</div>);
        }
    }

    render(){
        return(
            <div className="following-page">
                <h3>{this.props.params.username} is following</h3>
                {/*ul tag must be outside infinite or infiite no of ul will be made*/}
                <ul> 
                    <Infinite   isInfiniteLoading={this.state.loading}
                                onInfiniteLoad={this._fetchData}
                                useWindowAsScrollContainer
                                elementHeight={50}
                                infiniteLoadBeginEdgeOffset={this.state.infiniteOffset}
                                loadingSpinnerDelegate={this._loadingSign(this.state.loading)}>
                                
                        {this.state.followingArray.map(this._renderFollowing)}
                    </Infinite>
                </ul>
            </div>
        );
    }
}

export default Following;