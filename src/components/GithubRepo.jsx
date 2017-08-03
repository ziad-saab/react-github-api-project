import React from 'react';
//import { Link } from 'react-router';

class GithubRepo extends React.Component{
    constructor(){
        super();
        this.state = {};
    }
    
    render(){
        return(
            //Link is a react router component
            //see how to use the backticks and nested {{}}
            <span>
                <a href={this.props.repoData.html_url}>{this.props.repoData.full_name}</a> 
                <p> Stargazers: {this.props.repoData.stargazers_count} </p>
            </span>
        )
    }
}

export default GithubRepo;