import React from "react";
import {Link} from "react-router";

class GithubUser extends React.Component{
   static propTypes = {
      user: React.PropTypes.object.isRequired
   }

   render(){
      return(
         <Link to={`/user/${this.props.user.login}`}>
            <img src = {this.props.user.avatar_url}/>
            <p>{this.props.user.login}</p>
         </Link>
      )
   }
}



export default GithubUser;
