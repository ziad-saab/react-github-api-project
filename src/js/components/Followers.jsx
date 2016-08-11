var React = require('react');
var $ = require('jquery');
var Infinite = require('react-infinite');

var GithubUser = require('./GithubUser');

var Followers = React.createClass({
    getInitialState: function() {
        return {
            page: 1,
            loading: false,
            followers: []
        };
    },
    fetchData: function() {

        this.setState({
            loading: true
        });
        
        
        var url = `https://api.github.com/users/${this.props.params.username}/followers?access_token=6d7ffda3c063706d6b19b0321903ee347f9c1d8b&page=1&per_page=50`;
        var that = this;

        $.getJSON(url).then(
            function(response) {
                that.setState({
                    followers: that.state.followers.concat(response),
                    loading: false,
                    page: that.state.page + 1
                });
            });
    },
    render: function() {
        return (
            <div className="followers-page">
                <h3>Followers of {this.props.params.username}</h3>
                <ul>
                    <Infinite 
                        isInfiniteLoading={this.state.loading}
                        onInfiniteLoad={this.fetchData} 
                        useWindowAsScrollContainer
                        infiniteLoadBeginEdgeOffset={100}
                        elementHeight={50}>
                            {this.state.followers.map(function(eachUser){
                               return <GithubUser user={eachUser} key={eachUser.id}/>;
                            })}
                    </Infinite>
                </ul>
            </div>
        );
    }
});

module.exports = Followers;