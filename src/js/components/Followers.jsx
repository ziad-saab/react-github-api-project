var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');
var GithubUser = require("./GithubUser");


var Followers = React.createClass({
	
    getInitialState: function(){
    	return {};
    },
    // abosolutely do not forget this!!
    	// the getInitialState is necessary for setting states
    	//otherwise, null ^(>o<)^
	componentDidMount: function(){
		var that = this;
			// that is the this referring to our component
		 $.getJSON(`https://api.github.com/users/${this.props.params.username}/followers?access_token=8dbd67ccdec639d5803b020db060a7e3d5be27cc`)
			 .then(
			 	function(followers){
				 	

				 	that.setState({
                        followers: followers
                    });
			 	}
			 );
	},
	getFollowers: function(follow){
		return <GithubUser user={follow} key={follow.id}/>;
	},
	render: function(){
		
		if (!this.state.followers) {
			return (<div>LOADING FOLLOWERS...</div>);
		}

		return (
		    <div className="followers-page">
		        <h2>Followers of {this.props.params.username}</h2>
		        <ul className="followers-list">
		            {this.state.followers.map(this.getFollowers)}
		        </ul>
		    </div>
		);
	}
});


module.exports = Followers;