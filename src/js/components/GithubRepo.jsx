var React = require('react');
var FontAwesome = require('react-fontawesome');

var GithubRepo = React.createClass({
	render: function(){
		return (
				<a className="repo" href={this.props.repo.html_url}>
					{this.props.repo.name}
					<FontAwesome name='star' />
					<span>
						{this.props.repo.stargazers_count}
					</span>
				</a>
    	);
	}
});

module.exports = GithubRepo;




    