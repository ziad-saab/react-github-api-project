var React = require('react');
var $ = require("jquery");
var GithubUser = require("./GithubUser.jsx");



var Followers = React.createClass({
    getInitialState: function(){
        return {
            followers: []
        };
    },
    componentDidMount: function() {
        var that = this;
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/followers?access_token=6a8cf53c2aa5c4ae828dd476cce0a58f7c069def`)
            .done(
                
                function(followers) {
                    console.log(followers, "NOT HAPPENING")
                    that.setState({
                        followers: followers
                    });
                }
            ).fail(function(err){
                console.log(err);
            })
    },
    render: function() {
        if (!this.state.followers) {
            return <div>LOADING FOLLOWERS...</div>
        }
        console.log(this.state.followers)
        return (
        <div className="followers-page">
            <h2>People that follow {this.props.params.username}:</h2>
            <ul>
                {this.state.followers.map(function(user){
                    return <GithubUser key={user.id} user={user}/>
                })}
            </ul>
        </div>
        );
    }
});

module.exports = Followers;