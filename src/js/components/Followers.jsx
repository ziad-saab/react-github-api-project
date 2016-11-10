var React = require('react');
var Link = require('react-router').Link;

var Followers = React.createClass({
	componentDidMount: function(){
		 $.getJSON(`https://api.github.com/users/${this.props.params.username}/followers?access_token=8dbd67ccdec639d5803b020db060a7e3d5be27cc`)
		 .then(function(result){
		 	setState({
		 		followers: followers
		 	});
		 });
	},
	render: function(){
		return (
			<div className="followers-page">
			  <h3>Followers of USERNAME</h3>
			</div>
		);
	}
});


module.exports = Followers;