import React from "react";
import {Link} from "react-router";

class GithubRepo extends React.Component{
   static propTypes = {
      repo: React.PropTypes.object.isRequired
   }

   render(){
      return(
         <a href={this.props.repo.url}>
            <p>{this.props.repo.full_name}</p>
         </a>
      )
   }
}



export default GithubRepo;
