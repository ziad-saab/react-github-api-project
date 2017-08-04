import React from 'react';
import { Link } from 'react-router';

class GithubUser extends React.Component{
    constructor(){
        super();
        //console.log(props, "My props")
        this.state = {};
    }
    
    render(){
        return(
            //Link is a react router component
            //see how to use the backticks and nested {{}}
            <div className>
                <Link className="user-info" to={`/user/${this.props.user.login}`}>
                    <img className="user-info__avatar" src={this.props.user.avatar_url} alt={`${this.props.user.login} avatar`}/>
                    <p className="user-info__text"> {this.props.user.login} </p>
                </Link>
            </div>
        )
    }
}

export default GithubUser;