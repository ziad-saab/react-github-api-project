var React = require('react');

var GithubRepo = React.createClass({
    propTypes: {
        repo: React.PropTypes.shape({
            stargazers_count: React.PropTypes.number.isRequired,
            html_url: React.PropTypes.string.isRequired,
            full_name: React.PropTypes.string.isRequired
        })
    },
    render: function() {
        var url = this.props.repo.html_url;
        var name = this.props.repo.full_name;
        var stars = this.props.repo.stargazers_count;
        
        return (
            <a target="_blank" className="github-repotag" href={url}>
                {name}
                {' '}
                <span className="github-repotag__stars">{stars}★</span>
            </a>
        )
    }
});

module.exports = GithubRepo;