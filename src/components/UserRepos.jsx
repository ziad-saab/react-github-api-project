import React from 'react';
// import { Link } from 'react-router';
import Repo from './Repo';


class Following extends React.Component {
  constructor(){
    super();
    this.state = {}
  }
  displayUser(curVal){
    return( <Repo name={curVal.name} link={curVal.html_url} key={curVal.id}/>)
  }
  componentDidMount(){
    fetch(`https://api.github.com/users/${this.props.params.username}/repos`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({
        followed: data
      })
    })
  }

  render(){
    if(!this.state.followed){
      return( <div>Loading Repos...</div>)
    }
    return(
      <div className="following-page">
        <h3>{this.props.params.username}'s repos </h3>
        <div>
        {this.state.followed.map(this.displayUser.bind(this))}
        </div>
        {this.props.children}
      </div>
    )
  }
}
export default Following;