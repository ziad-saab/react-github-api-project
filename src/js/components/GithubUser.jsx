var React = require('react');
var Link = require('react-router').Link;

var GithubUser = React.createClass({
    propTypes: {
      user: React.PropTypes.string.isRequired  
    },
    render: function(){
        return(
            <div className="followers_box">
                <Link className="follower_link" to={"/user/" + this.props.user.login}>
                <img className="user-info__avatar" src={this.props.user.avatar_url}/>
                <div>{this.props.user.login}
                </div>
                </Link>
            </div>
        );
    }
});

module.exports = GithubUser;