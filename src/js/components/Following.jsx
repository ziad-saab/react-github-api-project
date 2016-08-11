var React = require('react');
var $ = require('jquery');

var GithubUser = require('./GithubUser');

var Following = React.createClass({
    getInitialState: function() {
        return {};
    },
    fetchData: function() {
        var url = `https://api.github.com/users/${this.props.params.username}/following?access_token=6d7ffda3c063706d6b19b0321903ee347f9c1d8b`;
        var that = this;

        $.getJSON(url).then(
            function(response) {
                that.setState({
                    following: response
                });
            });
    },
    componentDidMount: function(){
        this.fetchData();
    },
    componentDidUpdate: function(prevProps){
        if(prevProps.params.username !== this.props.params.username){
            this.fetchData();
        }
    },
    render: function() {
        if (!this.state.following) {
            return <div>LOADING DATA...</div>;
        }
        return (
            <div className="following-page">
                <h3>{this.props.params.username} follows</h3>
                <ul>
                    {this.state.following.map(function(eachUser){
                       return <GithubUser user={eachUser} key={eachUser.id}/>;
                    })}
                </ul>
                
            </div>
        );
    }
});

module.exports = Following;