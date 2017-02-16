import React from "react";
import GithubUser from "./GithubUser";



class Followers extends React.Component{
   constructor(){
      super();
      this.state={};
   }
   componentDidMount(){
      var url = `https://api.github.com/users/${this.props.params.username}/followers`;

      fetch(url)
      .then(response => response.json())
      .then(
         followers => {
            this.setState({
               followers: followers
            })
         }
      )
   }
   render(){
      return(
         <div className = "followers-page">
            <h3>Followers of USERNAME</h3>
            <GihubUser />
         </div>
      )
   }
}

export default Followers;
