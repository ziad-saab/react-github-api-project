import React from 'react';
// import { Link } from 'react-router';
import GithubUser from './GithubUser';
import Infinite from 'react-infinite';

class Following extends React.Component {

 constructor() {
    super();
    this.state = {
      page: 1,
      loading: false,
      following: []
    };
}

 fetchData = () => {

   this.setState({
      loading: true
    });
    //console.log(this)
    fetch(`https://api.github.com/users/${this.props.params.username}/following?&page=${this.state.page}&per_page=50`)
      .then(response => response.json())
      .then(
        followingResponse => {
          console.log('got response');

         let mergedArray = this.state.following.concat(followingResponse);
          this.setState({
            following: mergedArray,
            page: this.state.page + 1,
            loading: false
          });
        }
      );

  }

 componentDidUpdate(prevProps, prevState) {
    if (prevProps.params.username !== this.props.params.username) {
      this.fetchData();
    }
  }

 render() {
    console.log('in render', this.state.following);
    //
    // if (!this.state.followers) {
    //   return <div>LOADING followers...</div>;
    // }
    return (
      <div className="following-page">
        <h3>Followed by {this.props.params.username}</h3>
        <div className="Infinite-scroll-following">
            <Infinite className="following-page-infinite"
                      isInfiniteLoading={this.state.loading}
                      onInfiniteLoad={this.fetchData.bind(this)}
                      useWindowAsScrollContainer
                      elementHeight={100}
                      infiniteLoadBeginEdgeOffset={100} >
                {this.state.following.map(followed => {
                      return <GithubUser user={followed.login} key={followed.id} avatar_url={followed.avatar_url} /> 
                    
                }
                )} 
            </Infinite>
        </div>
      </div>
    );
  }
}
export default Following;