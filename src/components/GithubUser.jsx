import React from 'react';
import { Link } from 'react-router';

class GithubUser extends React.Component {
    render(){
        return (
            <Link to={`/user/${this.props.user.login}`}>
                <img src={this.props.user.avatar_url} alt={`github pic of ${this.props.user.login}`}/>
                <p>
                    {this.props.user.login}
                </p>
            </Link>
        );
    }
}

export default GithubUser;