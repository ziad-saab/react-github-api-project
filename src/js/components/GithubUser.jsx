var React = require('react');
var Link = require('react-router').Link;
		
var GithubUser = React.createClass({

	render: function(){
		
		return (
			<Link className="follow" to={`/user/${this.props.user.login}`}>
			  <img src={this.props.user.avatar_url}/>
			  {this.props.user.login}
			</Link>
		);
	}
});

module.exports = GithubUser;
