var React = require('react');
var $ = require("jquery");
var GithubUser = require("./GithubUser.jsx");



var Following = React.createClass({
    getInitialState: function(){
        return {
            following: []
        };
    },
    componentDidMount: function() {
        var that = this;
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/following?access_token=6a8cf53c2aa5c4ae828dd476cce0a58f7c069def`)
            .done(
                
                function(following) {
                    console.log(following, "NOT HAPPENING")
                    that.setState({
                        following: following
                    });
                }
            ).fail(function(err){
                console.log(err);
            })
    },
    render: function() {
        if (!this.state.following) {
            return <div>LOADING FOLLOWERS...</div>
        }
        console.log(this.state.following)
        return (
        <div className="followers-page">
            <h2>People that {this.props.params.username} is following:</h2>
            <ul>
                {this.state.following.map(function(user){
                    return <GithubUser key={user.id} user={user}/>
                })}
            </ul>
        </div>
        );
    }
});

module.exports = Following;