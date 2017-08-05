import React from 'react';
import { Link } from 'react-router';

class GithubUser extends React.Component {
    

    render() {
        return (
        <div>
            <Link className="githubUserLink" to={`/user/${this.props.user}`}>
                <div className="githubUserDisplay">
                    <img className="githubUser-avatar" src={this.props.avatar_url} alt={`${this.props.user} avatar`} />
                    <h2 className="githubUser-name">{this.props.user}</h2>
                </div>    
            </Link>
        </div>
        );
    }
}
export default GithubUser;