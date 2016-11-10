var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');
var GithubRepo = require("./GithubRepo");


var Repos = React.createClass({
	
    getInitialState: function(){
    	return {};
    },
    // abosolutely do not forget this!!
    	// the getInitialState is necessary for setting states
    	//otherwise, null ^(>o<)^
	componentDidMount: function(){
		var that = this;
			// that is the this referring to our component
		 $.getJSON(`https://api.github.com/users/${this.props.params.username}/repos?access_token=8dbd67ccdec639d5803b020db060a7e3d5be27cc`)
			 .then(
			 	function(repo){
				 	

				 	that.setState({
                        repo: repo
                    });
			 	}
			 );
	},
	
	getRepos: function(repos){
		return <GithubRepo repo={repos} key={repos.id}/>;
	},
	render: function(){
		
		if (!this.state.repo) {
			return (<div>LOADING REPOSITORIES...</div>);
		}

		return (
		    <div className="repos-page">
		        <h2>The repositories of {this.props.params.username}</h2>
		        <ul className="repos-list">
		            {this.state.repo.map(this.getRepos)}
		        </ul>
		    </div>
		);
	}
});


module.exports = Repos;