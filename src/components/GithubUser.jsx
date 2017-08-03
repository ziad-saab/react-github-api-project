import React from 'react';
import { Link } from 'react-router';

class GithubUser extends React.Component {
    render(){
        return (
            <div className="user-div">
                <Link className="img-link" to={`/user/${this.props.user.login}`}>
                    <div className="link-user-div">
                        <img className="user-img" src={this.props.user.avatar_url} alt={`github pic of ${this.props.user.login}`}/>
                        <span>
                            {this.props.user.login}
                        </span>
                    </div>
                </Link>
            </div>
        );
    }
}

export default GithubUser;