import React from "react";
import GithubUser from "./GithubUser";



class Following extends React.Component{
   constructor(){
      super();
      this.state={};
   }
   fetchData(){
      var url = `https://api.github.com/users/${this.props.params.username}/following?access_token=d9b73e1b5ed5cbd896765964b71c3edc083ed288`;

      fetch(url)
      .then(response => response.json())
      .then(
         following => {
            this.setState({
               following: following
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
      if(!this.state.following){
         return <div>LOADING FOLLOWERS....</div>
      }
      return(
         <div className = "following-page">
            <h3>{this.props.params.username} is following </h3>
            <ul>
               {this.state.following.map((followingInfo, i) => <GithubUser user={followingInfo} key={i}/>)}
            </ul>
         </div>
      )
   }
}

export default Following;
