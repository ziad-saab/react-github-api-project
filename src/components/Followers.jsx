import React from 'react';
// import { Link } from 'react-router';
import GithubUser from './GithubUser'


class Followers extends React.Component {
  constructor(){
    super();
    this.state = {}
  }
  displayUser(curVal){
    return( <GithubUser username={curVal.login} avatar={curVal.avatar_url} key={curVal.id}/>)
  }
  componentDidMount(){
    fetch(`https://api.github.com/users/${this.props.params.username}/followers`)
    .then(data => data.json())
    .then(data => {
      this.setState({
        followers: data
      })
    })
  }

  render(){
    if(!this.state.followers){
      return( <div>Loading Followers...</div>)
    }
    return(
      <div className="followers-page">
        <h3>Followers of {this.props.params.username}</h3>
        <div>
        {this.state.followers.map(this.displayUser.bind(this))}
        </div>
        {this.props.children}
      </div>
    )
  }
}
export default Followers;