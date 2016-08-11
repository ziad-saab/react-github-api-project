var React = require('react');
var $ = require("jquery");
var GithubRepo = require("./GithubRepo.jsx");
var Infinite = require('react-infinite');

var Repos = React.createClass({
    getInitialState: function(){
        return {
            page: 1,
            loading: false,
            repos: []
        };
    },
    fetchData: function() {
        this.setState({
            loading: true
        })
        var that = this;
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/repos?access_token=6a8cf53c2aa5c4ae828dd476cce0a58f7c069def&page=${this.state.page}&per_page=50`)
            .then(
                function(repos) {
                    that.setState({
                        repos: that.state.repos.concat(repos),
                        loading: false,
                        page:(that.state.page + 1)
                    });
                }
            ).catch(function(err){
                console.log(err);
            })
    },
    render: function() {
        return (
        <div className="followers-page">
            <h2>{this.props.params.username}'s repos:</h2>
            
            <Infinite isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer elementHeight={20} infiniteLoadBeginEdgeOffset={100} loadingSpinnerDelegate={<div>LOADING...</div>}>
                
                {this.state.repos.map(function(repo) {
                    return <GithubRepo key={repo.id} repo={repo}/>
                })}
                
            </Infinite>
        </div>
        );
    }
});

module.exports = Repos;