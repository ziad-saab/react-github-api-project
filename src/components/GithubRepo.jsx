import React from 'react';

class GithubRepo extends React.Component {
    render(){
        return(
            <a href={this.props.repo.html_url} target="_blank">
                <p>{this.props.repo.full_name}</p>
                <p>{this.props.repo.stargazers_count} ★</p>
            
            </a>
            )
    }
}

export default GithubRepo;