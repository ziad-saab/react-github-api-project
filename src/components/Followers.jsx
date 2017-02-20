import React from "react";
import GithubUser from "./GithubUser";



class Followers extends React.Component{
   constructor(){
      super();
      this.state={};
   }
   fetchData(){
      var url = `https://api.github.com/users/${this.props.params.username}/followers?access_token=d9b73e1b5ed5cbd896765964b71c3edc083ed288`;

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
   componentDidMount(){
      this.fetchData();
   }
   componentDidUpdate(prevProps, prevState){
      if(prevProps.username !==this.props.params.username){
         this.fetchData();
      }
   }
   render(){
      if(!this.state.followers){
         return <div>LOADING FOLLOWERS....</div>
      }
      return(
         <div className = "followers-page">
            <h3>Followers of {this.props.params.username}</h3>
            <ul>
               {this.state.followers.map((followersInfo, i) => <GithubUser user={followersInfo} key={i}/>)}
            </ul>
         </div>
      )
   }
}

export default Followers;
