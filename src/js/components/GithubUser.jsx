var React = require('react');
var Link = require('react-router').Link;

var GithubUser = React.createClass({
    render: function() {
        return (
        <div>
            <Link to={'/user/' + this.props.user.login} className="followerList">
                <img src={this.props.user.avatar_url}/>
                <p className="followerListUsername">{this.props.user.login}</p>
            </Link>
        </div>
        )
    }
})

module.exports = GithubUser;