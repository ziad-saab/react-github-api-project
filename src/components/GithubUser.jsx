import React from 'react';
import { Link } from 'react-router';


class GithubUser extends React.Component {
  render(){
    return(
    <div className="user">
      <Link to={`/user/${this.props.username}`}>
        <img src={this.props.avatar} alt="avatar"/>
        {this.props.username}
      </Link>
    </div>
    )
  }
}
export default GithubUser