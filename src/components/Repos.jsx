import React from 'react';
import GithubRepo from './GithubRepo'

class Repos extends React.Component{
    constructor() {
        super();
        this.state = {};
    }
    
    _fetchData() {
        //this.props.params.username is the parameter username 
        //from the url we are on, i.e. /user/:username 
        var API_TOKEN = 'e681da67137ba7c388bc0d86c25ad9e0e03f2391';
        fetch(`https://api.github.com/users/${this.props.params.username}/repos?access_token=${API_TOKEN}`)
        .then(response => response.json())
        .then(response => {
            //the response is an array of objects, each object being a follower
            console.log(response, "the response from api")
                this.setState({
                    reposArray: response
                });
            }
        );
    }
    
    _renderRepos(repo){
        return(
                <li className="repos-list" key={repo.id}>
                    <GithubRepo repoData={repo}/>  
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
        if(!this.state.reposArray){ 
            return (<div className="followers-page">LOADING your repos...</div>);
        }
        return(
            <div className="following-page">
                <h3>{this.props.params.username}'s Repos</h3>
                <ul>
                    {/*_renderFollower will use the github user component*/}
                    {this.state.reposArray.map(this._renderRepos.bind(this))} 
                </ul>
            </div>
        );
    }
}

export default Repos;