import React from 'react';
import GithubRepo from './GithubRepo'
var Infinite = require('react-infinite');

const API_TOKEN = 'e681da67137ba7c388bc0d86c25ad9e0e03f2391';

class Repos extends React.Component{
    constructor() {
        super();
        this.state = {
            page: 1,
            loading: false,
            reposArray: [],
            infiniteOffset: 100
        };
    }
    
    _fetchData=()=> {
        this.setState({
            loading: true
        });
        
        fetch(`https://api.github.com/users/${this.props.params.username}/repos?access_token=${API_TOKEN}&page=${this.state.page}&per_page=50`)
        .then(response => response.json())
        .then(response => {
            
            if(response.length){
                this.setState({
                    reposArray: this.state.reposArray.concat(response),
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
    
    _renderRepos(repo){
        return(
            <li className="repos-list" key={repo.id}>
                <GithubRepo repoData={repo}/>  
            </li>
        );
    }

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
            <div className="repo-page">
                <h3>{this.props.params.username}'s Repos</h3>
                {/*ul tag must be outside infinite or infiite no of ul will be made*/}
                <ul> 
                    <Infinite   isInfiniteLoading={this.state.loading}
                                onInfiniteLoad={this._fetchData}
                                useWindowAsScrollContainer
                                elementHeight={50}
                                infiniteLoadBeginEdgeOffset={this.state.infiniteOffset}
                                loadingSpinnerDelegate={this._loadingSign(this.state.loading)}>
                                
                        {this.state.reposArray.map(this._renderRepos)}
                    </Infinite>
                </ul>
            </div>
        );
    }
}

export default Repos;