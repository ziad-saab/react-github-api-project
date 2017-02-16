import React from "react";

class GithubUser extends React.Component{
   render(){
      return(
         <link to = {`/user/${this.props.params.user.login}`}>
            <img src = {this.props.params.user.avatar_url}/>
            {this.props.params.user.login}
         </link>
      )
   }
}



export default GithubUser;
