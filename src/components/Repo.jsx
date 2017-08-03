import React from 'react';
import GithubRepo from "./GithubRepo";
import Infinite from 'react-infinite';

class Repo extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            loading: false,
            repos: [],
            infiniteLoadBeginEdgeOffsetState : 10
        };
    }

    fetchData() {
        var API_KEY = "";

        this.setState({
            loading: true
        });

        fetch(`https://api.github.com/users/${this.props.params.username}/repos?access_token=${API_KEY}&page=${this.state.page}&per_page=50`)
            .then(r => r.json())
            .then((data) => {
                if (data.length > 0){
                    this.setState({
                        repos: this.state.repos.concat(data),
                        loading: false,
                        page: this.state.page + 1,
                        infiniteLoadBeginEdgeOffsetState : 100
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
            <div className="repos-page">
                <div className="repos-header">
                    <h2>Repos of {this.props.params.username}:</h2>
                </div>
                {this.state.loading === true ?
                    <div className="repos-header">
                        <h2>Loading repos of {this.props.params.username}</h2>
                    </div> : null}
                <Infinite className="repos-scroll" isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData.bind(this)} useWindowAsScrollContainer={true} elementHeight={24} infiniteLoadBeginEdgeOffset={this.state.infiniteLoadBeginEdgeOffsetState} loadingSpinnerDelegate={ <div className="loading-div">
                    <img src="https://media.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif" alt="Loading" width="42" height="42"/> </div>}>
                    {
                        this.state.repos.map(
                            function (repoItem) {
                                return (<GithubRepo repo={repoItem} key={repoItem.id}/>);
                            }
                        )
                    }
                </Infinite>
            </div>
        );

    }
}

export default Repo;
