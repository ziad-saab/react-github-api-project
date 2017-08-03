import React from 'react';
import GithubUser from "./GithubUser";
import Infinite from 'react-infinite';

class Following extends React.Component{
    constructor(){
        super();
        this.state = {
            page : 1,
            loading: false,
            following: [],
            infiniteLoadBeginEdgeOffsetState: 10
        };
    }

    fetchData(){
        var API_KEY = "";

        this.setState({
            loading: true
        });

        fetch(`https://api.github.com/users/${this.props.params.username}/following?access_token=${API_KEY}&page=${this.state.page}&per_page=50`)
            .then( r => r.json() )
            .then( (data) => {
                if (data.length > 0){
                    this.setState({
                        following : this.state.following.concat(data), //data already comes as an array
                        loading : false,
                        page : this.state.page + 1
                    });
                }
                else {
                    this.setState({
                        infiniteLoadBeginEdgeOffsetState: undefined
                    });
                }
            });
    }

    render() {
        return (
            <div className="following-page">
                <div className="following-header">
                    <h2>{this.props.params.username} is following:</h2>
                </div>
                {this.state.loading === true ?
                    <div className="followers-header">
                        <h2>Loading who {this.props.params.username} is following</h2>
                    </div> : null}
                <Infinite className="following-scroll" isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData.bind(this)}
                          useWindowAsScrollContainer={true} elementHeight={50} infiniteLoadBeginEdgeOffset={this.state.infiniteLoadBeginEdgeOffsetState} loadingSpinnerDelegate={<div className="loading-div">
                    <img src="https://media.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif" alt="Loading" width="42" height="42"/> </div>} >
                    {
                        this.state.following.map(
                            function (arrayItemFollowingUser) {
                                return (
                                    <GithubUser user={arrayItemFollowingUser} key={arrayItemFollowingUser.id}/>
                                );
                            }
                        )
                    }
                </Infinite>
            </div>
        );
    }
}

export default Following;