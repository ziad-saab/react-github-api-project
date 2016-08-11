var React = require('react');
var Link = require('react-router').Link;

var GithubRepo = React.createClass({
    render: function() {
        
        return (
        <div className="repoDisplayer">
            <p className="bullet">►</p><a href={this.props.repo.html_url}>{this.props.repo.name}</a>
            <p className="repoStarCount">⭐️ {this.props.repo.stargazers_count}</p>
        </div>
        )
    }
})

module.exports = GithubRepo;