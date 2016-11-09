var React = require('react');
var Link = require('react-router').Link;

var Followers = React.createClass({
	render: function(){
		return (
			<div className="followers-page">
			  <h3>Followers of USERNAME</h3>
			</div>
		);
	}
})

module.exports = Followers;
