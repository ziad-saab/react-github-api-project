import React from 'react';
// import { Link } from 'react-router';
import GithubRepo from './GithubRepo';
import Infinite from 'react-infinite';

class Repos extends React.Component {

 constructor() {
    super();
    this.state = {
      page: 1,
      loading: false,
      repos: []
    };
}

 fetchData = () => {

   this.setState({
      loading: true
    });
    //console.log(this)
    fetch(`https://api.github.com/users/${this.props.params.username}/repos?&page=${this.state.page}&per_page=50`)
      .then(response => response.json())
      .then(
        reposResponse => {
          console.log('got response');

         let mergedArray = this.state.repos.concat(reposResponse);
          this.setState({
            repos: mergedArray,
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
      <div className="repos-page">
        <h3>Public Repositories by {this.props.params.username}</h3>
        <div className="Infinite-scroll-repos">
            <Infinite className="repos-page-infinite"
                      isInfiniteLoading={this.state.loading}
                      onInfiniteLoad={this.fetchData.bind(this)}
                      useWindowAsScrollContainer
                      elementHeight={100}
                      infiniteLoadBeginEdgeOffset={100} >
                {this.state.repos.map(repo => {
                    return (
                      <div className="RepoStyle" key={repo.id}>
                            <GithubRepo name={repo.full_name} stargazers={repo.stargazers_count}/>  
                      </div>
                    
                )}
                )} 
            </Infinite>
        </div>
      </div>
    );
  }
}
export default Repos;