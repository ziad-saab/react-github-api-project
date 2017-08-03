import React from 'react';

class GithubRepo extends React.Component {
    render(){
        return (
            <div className="repo-div">
                <a href={this.props.repo.html_url}>
                    <span>
                        {this.props.repo.full_name}
                    </span>
                </a>
                {this.props.repo.stargazers_count}
                <img src="https://i.imgur.com/g0gbFkV.png" alt="stars" className="repo-star"/>
            </div>
        );
    }
}

export default GithubRepo;