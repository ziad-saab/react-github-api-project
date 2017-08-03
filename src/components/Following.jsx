import React from 'react';
import GithubUser from "./GithubUser";

class Following extends React.Component{

    constructor(){
        super();
        this.state = {};
    }

    componentDidMount(){
        var API_KEY = "4d0826ee9c11ced776a6c9ff649d34fc0f30580f";
        fetch(`https://api.github.com/users/${this.props.params.username}/following?access_token=${API_KEY}`)
            .then( r => r.json() )
            .then( (data) => {
                this.setState({following : data});
            });
    }

    render(){
          if (!this.state.following){
              return (
                  <div>
                      LOADING WHO {this.props.params.username} FOLLOWS
                  </div>
              );
          }
          else{
              return (
                  <div className="following-page">
                      <h2>{this.props.params.username} is following:</h2>
                      <ul>
                          {
                              this.state.following.map(
                                  function(arrayItemFollowingUser) {
                                      return (
                                          <GithubUser user={arrayItemFollowingUser} key={arrayItemFollowingUser.id}/>
                                      );
                                  }
                              )
                          }
                      </ul>
                  </div>
              );
          }
    }
}

export default Following;