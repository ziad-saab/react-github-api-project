var React = require('react');
var $ = require("jquery");
var GithubUser = require("./GithubUser.jsx");
var Infinite = require('react-infinite');



var Following = React.createClass({
    getInitialState: function(){
        return {
            page: 1,
            loading: false,
            following: []
        };
    },
    fetchData: function() {
        var that = this;
        this.setState({
            loading: true
        })
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/following?access_token=6a8cf53c2aa5c4ae828dd476cce0a58f7c069def&page=${this.state.page}&per_page=50`)
            .then(
                function(following) {
                    console.log(following, "checking checking checking")
                    that.setState({
                        following: that.state.following.concat(following),
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
            <h2>People that {this.props.params.username} is following:</h2>
            <Infinite isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer elementHeight={90} infiniteLoadBeginEdgeOffset={100}>
                
                {this.state.following.map(function(user) {
                    return <GithubUser key={user.id} user={user}/>
                })}
                
            </Infinite>
        </div>
        );
    }
});

module.exports = Following;