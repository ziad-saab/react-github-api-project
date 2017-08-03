import React from 'react';

class GithubRepo extends React.Component {
    render(){
        return (
            <div>
                <a href={this.props.repo.html_url}>
                    <p>
                        {this.props.repo.full_name}
                    </p>
                </a>
                {this.props.repo.stargazers_count}
                <img src="https://i.imgur.com/g0gbFkV.png" alt="stars"/>
            </div>
        );
    }
}

export default GithubRepo;