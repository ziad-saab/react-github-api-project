import React from 'react';
import GithubRepo from "./GithubRepo";

class Repo extends React.Component {
    constructor(){
        super();
        this.state = {};
    }

    componentDidMount(){
        var API_KEY = "";
        fetch(`https://api.github.com/users/${this.props.params.username}/repos?access_token=${API_KEY}`)
            .then( r => r.json() )
            .then( (data) => {
                this.setState({ repos : data });
            });
    }

    render(){
        if(!this.state.repos){
            return (
                <div>
                    Loading repos...
                </div>
            );
        }
        else{
            return(
                <div className="repos-page">
                    <h2>Repos of {this.props.params.username}:</h2>
                    <ul>
                        {
                            this.state.repos.map(
                                function (repoItem) {
                                    return (<GithubRepo repo={repoItem} key={repoItem.id}/>);
                                }
                            )
                        }
                    </ul>
                </div>
            );
        }

    }
}

export default Repo;
