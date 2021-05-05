import React from 'react';



class Repo extends React.Component {
  render(){
    return(
    <div className="user">
    <a href={this.props.link}>{this.props.link}</a>

    </div>
    )
  }
}
export default Repo;