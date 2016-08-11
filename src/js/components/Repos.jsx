var React = require('react');
var $ = require("jquery");
var GithubRepo = require("./GithubRepo.jsx");

var Repos = React.createClass({
    getInitialState: function(){
        return {
            repos: []
        };
    },
    componentDidMount: function() {
        var that = this;
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/repos?access_token=6a8cf53c2aa5c4ae828dd476cce0a58f7c069def`)
            .done(
                
                function(repos) {
                    console.log(repos[0].name, "heererrfr")
                    that.setState({
                        repos: repos
                    });
                }
            ).fail(function(err){
                console.log(err);
            })
    },
    render: function() {
        if (!this.state.repos) {
            return <div>LOADING REPOS...</div>
        }
        console.log(this.state.repos)
        return (
        <div className="followers-page">
            <h2>{this.props.params.username}'s repos:</h2>
            <ul>
                {this.state.repos.map(function(repo){
                    return (<GithubRepo key={repo.id} repo={repo}/>)
                })}
            </ul>
        </div>
        );
    }
});

module.exports = Repos;