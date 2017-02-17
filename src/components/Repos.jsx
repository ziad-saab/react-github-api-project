import React from "react";
import GithubRepo from "./GithubRepo";



class Repos extends React.Component{
   constructor(){
      super();
      this.state={};
   }
   fetchData(){
      var url = `https://api.github.com/users/${this.props.params.username}/repos?access_token=d9b73e1b5ed5cbd896765964b71c3edc083ed288`;
      fetch(url)
      .then(response => response.json())
      .then(
         repo => {
            this.setState({
               repo: repo
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
      if(!this.state.repo){
         return <div>LOADING FOLLOWERS....</div>
      }
      return(
         <div className="repo-page">
            <h3>{this.props.params.username} repos include </h3>
            <ul>
               {this.state.repo.map((repoInfo, i) => <GithubRepo repo={repoInfo} key={i}/>)}
            </ul>
         </div>
      )
   }
}

export default Repos;
