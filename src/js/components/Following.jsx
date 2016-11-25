var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');
var GithubUser = require("./GithubUser");


var Following = React.createClass({
	
    getInitialState: function(){
    	return {};
    },
    // abosolutely do not forget this!!
    	// the getInitialState is necessary for setting states
    	//otherwise, null ^(>o<)^
	componentDidMount: function(){
		var that = this;
			// that is the this referring to our component
		 $.getJSON(`https://api.github.com/users/${this.props.params.username}/following?access_token=8dbd67ccdec639d5803b020db060a7e3d5be27cc`)
			 .then(
			 	function(following){
				 	

				 	that.setState({
                        following: following
                    });
			 	}
			 );
	},
	
	getFollowers: function(follow){
		return <GithubUser user={follow} key={follow.id}/>;
	},
	render: function(){
		
		if (!this.state.following) {
			return (<div>LOADING FOLLOWING...</div>);
		}

		return (
		    <div className="following-page">
		        <h2>{this.props.params.username} is Following</h2>
		        <ul className="follow-list">
		            {this.state.following.map(this.getFollowers)}
		        </ul>
		    </div>
		);
	}
});


module.exports = Following;