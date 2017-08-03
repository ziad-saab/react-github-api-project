import React from 'react';
import { Link } from 'react-router';

class GithubUser extends React.Component {
    

    render() {
        // console.log(this.props)
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


//<img className="githubUser-avatar" src={this.props.params.user.avatar_url} alt={`${this.props.params.user.login} avatar`}/>
