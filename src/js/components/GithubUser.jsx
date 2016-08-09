var React = require('react');
var Link = require('react-router').Link;

var GithubUser = React.createClass({
    propTypes: {
        user: React.PropTypes.shape({
            login: React.PropTypes.string.isRequired,
            avatar_url: React.PropTypes.string
        })
    },
    render: function() {
        var url = `/user/${this.props.user.login}`;
        var username = this.props.user.login;
        var avatarUrl = this.props.user.avatar_url;
        
        return (
            <Link className="github-usertag" to={url}>
                <img className="github-usertag__avatar" src={avatarUrl}/>
                {username}
            </Link>
        )
    }
});

module.exports = GithubUser;