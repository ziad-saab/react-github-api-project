import React from 'react';
// import { Link } from 'react-router';
import GithubUser from './GithubUser';
import Infinite from 'react-infinite';

class Followers extends React.Component {
    
    constructor() {
        super();
        this.state = {
            page: 1, 
            loading: false, 
            followers: []
        };
    }
    
    fetchData() {
        this.setState = {
            loading: true
        }
        // console.log(this, "this before AJAX call")
        //https://api.github.com/users/USER/followers?access_token=XXX&page=1&per_page=50
        fetch(`https://api.github.com/users/${this.props.params.username}/followers?&page=${this.state.page}&per_page=50`)
        
        .then(response => response.json())
        // this.setState({list: this.state.list.concat([newObject])});
        // .then(console.log(this, "this after AJAX call"))
        .then(
            followers => {
                console.log("before set state", followers, this.state.followers.concat(followers))
                this.setState = {
                    followers: this.state.followers.concat(followers), 
                    loading: false, 
                    page: this.state.page + 1
                };
            }
        )
        // .then(
        //     console.log(this)
        // )
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log('update');
        if (prevProps.params.username !== this.props.params.username) { 
          this.fetchData();
      }
    }
    
    render() {
        // if (!this.state.followers) {
        //     return <div>LOADING FOLLOWERS...</div>;
        // }
        console.log('render', this.state.followers)
        return (
            <Infinite className="followers-page" 
            isInfiniteLoading={this.state.loading} 
            onInfiniteLoad={this.fetchData.bind(this)} 
            useWindowAsScrollContainer 
            elementHeight={100} 
            infiniteLoadBeginEdgeOffset={100} >
//             isInfiniteLoading: take it from your loading state
// onInfiniteLoad: point to your fetchData method
// useWindowAsScrollContainer: this prop doesn't have a value! It will be set to true automatically
// elementHeight: to scroll efficiently, React Infinite needs to know the height of an element. Use your browser's inspector to find the approximate height of your GithubUser elements. It's not perfect, but it'll do for now.
// infiniteLoadBeginEdgeOffset: this sets the amount of pixels from the edge of your container at which more data will be loaded. Set it to 
            
                  {this.state.followers.map(follower => {
                  console.log('wtf', follower)
                  return <GithubUser user={follower} key={follower.id} />
                      
                  } )}
            </Infinite>
        );
    }
}
export default Followers;