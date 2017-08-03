import React from 'react';
import GithubUser from './GithubUser'

class Following extends React.Component{
    constructor(){
        super();
        this.state = {};
    }
    
    _fetchData() {
        //this.props.params.username is the parameter username 
        //from the url we are on, i.e. /user/:username 
        fetch(`https://api.github.com/users/${this.props.params.username}/following`)
        .then(response => response.json())
        .then(response => {
            //the response is an array of objects, each object being a follower
            console.log(response, "the response from api")
                this.setState({
                    followingArray: response
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

    componentDidMount(){
        this._fetchData();
    }
    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.params.username !== this.props.params.username){
            this._fetchData();
        }
    }

    render(){
        if(!this.state.followingArray){ 
            return (<div className="followers-page">LOADING People you follow...</div>);
        }
        return(
            <div className="following-page">
                <h3>{this.props.params.username} is following</h3>
                <ul>
                    {/*_renderFollower will use the github user component*/}
                    {this.state.followingArray.map(this._renderFollower.bind(this))} 
                </ul>
            </div>
        );
    }
}

export default Following;