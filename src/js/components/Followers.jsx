var React = require('react');
var $ = require("jquery");
var GithubUser = require("./GithubUser.jsx");
var Infinite = require('react-infinite');



var Followers = React.createClass({
    getInitialState: function(){
        return {
            page: 1,
            loading: false,
            followers: []
        };
    },
    fetchData: function() {
        var that = this;
        this.setState({
            loading: true
        })
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/followers?access_token=6a8cf53c2aa5c4ae828dd476cce0a58f7c069def&page=${this.state.page}&per_page=50`)
            .then(
                function(followers) {
                    console.log(followers, "checking checking checking")
                    that.setState({
                        followers: that.state.followers.concat(followers),
                        loading: false,
                        page: (that.state.page + 1)
                    });
                }
            ).catch(function(err){
                console.log(err);
            })
    },
    render: function() {
        return (
        <div className="followers-page">
            <h2>People that follow {this.props.params.username}:</h2>
            <Infinite isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer elementHeight={90} infiniteLoadBeginEdgeOffset={100}>
                
                {this.state.followers.map(function(user) {
                    return <GithubUser key={user.id} user={user}/>
                })}
                
            </Infinite>
        </div>
        );
    }
});

module.exports = Followers;