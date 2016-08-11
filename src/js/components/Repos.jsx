var React = require('react');
var $ = require('jquery');

var GithubRepo = require('./GithubRepo');

var Repos = React.createClass({
    getInitialState: function() {
        return {
            repos: []
        };
    },
    componentDidMount: function() {
        var url = `https://api.github.com/users/${this.props.params.username}/repos?access_token=6d7ffda3c063706d6b19b0321903ee347f9c1d8b`;
        var that = this;
        
        $.getJSON(url).then(
            function(response) {
                console.log('response if you need it ', response);   
                that.setState({
                    repos: response
                });
            });
         
    },
    render: function() {
        if (!this.state.repos) {
            return <div>LOADING REPOS...</div>;
        }
        return (
            <div>
                <h3>{this.props.params.username} public repos</h3>
                <ul>
                    {this.state.repos.map(function(eachRepo){
                       return <GithubRepo repo={eachRepo} key={eachRepo.id}/>;
                    })}
                </ul>
            </div>
        );
    }
});

module.exports = Repos;