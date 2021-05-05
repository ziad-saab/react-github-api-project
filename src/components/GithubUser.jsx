import React from 'react';
import { Link } from 'react-router';


class GithubUser extends React.Component {
  render(){
    return(
    <div className="user">
      <Link to={`/user/${this.props.username}`}>
        <img src={this.props.avatar} alt="avatar"/>
        <span>{this.props.username}</span>
      </Link>
    </div>
    )
  }
}
export default GithubUser