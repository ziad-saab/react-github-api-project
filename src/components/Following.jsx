import React from 'react';
// import { Link } from 'react-router';
import GithubUser from './GithubUser'


class Following extends React.Component {
  constructor(){
    super();
    this.state = {}
  }
  displayUser(curVal){
    return( <GithubUser username={curVal.login} avatar={curVal.avatar_url} key={curVal.id}/>)
  }
  componentDidMount(){
    fetch(`https://api.github.com/users/${this.props.params.username}/following`)
    .then(data => data.json())
    .then(data => {
      this.setState({
        followed: data
      })
    })
  }

  render(){
    if(!this.state.followed){
      return( <div>Loading Users...</div>)
    }
    return(
      <div className="following-page">
        <h3>{this.props.params.username} Follows... </h3>
        <div>
        {this.state.followed.map(this.displayUser.bind(this))}
        </div>
        {this.props.children}
      </div>
    )
  }
}
export default Following;