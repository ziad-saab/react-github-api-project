import React from 'react';
import { Link } from 'react-router';

class GithubUser extends React.Component {
    render(){
        var userUrl = `/user/${this.props.user.login}`;
        return(
            <Link className="githubUser-info" to={userUrl}>
                <img src={this.props.user.avatar_url} alt={this.props.user.login}/>
                <p>{this.props.user.login}</p>
            </Link>
            )
    }
}

export default GithubUser;