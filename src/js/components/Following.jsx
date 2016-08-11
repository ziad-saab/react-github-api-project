var React = require('react');
var $ = require('jquery');
var Infinite = require('react-infinite');

var GithubUser = require('./GithubUser');

var Following = React.createClass({
    getInitialState: function() {
        return {
            page: 1,
            loading: false,
            following: []
        };
    },
    fetchData: function() {
        
        this.setState({
           loading: true 
        });
        
        var url = `https://api.github.com/users/${this.props.params.username}/following?access_token=6d7ffda3c063706d6b19b0321903ee347f9c1d8b&page=${this.state.page}&per_page=50`;
        var that = this;

        $.getJSON(url).then(
            function(response) {
                that.setState({
                    following: that.state.following.concat(response),
                    loading: false,
                    page: that.state.page + 1
                });
            });
    },
    render: function() {
        return (
            <div className="following-page">
                <h3>{this.props.params.username} follows</h3>
                <ul>
                    <Infinite 
                        isInfiniteLoading={this.state.loading}
                        onInfiniteLoad={this.fetchData} 
                        useWindowAsScrollContainer
                        infiniteLoadBeginEdgeOffset={100}
                        elementHeight={50}>
                            {this.state.following.map(function(eachUser){
                               return <GithubUser user={eachUser} key={eachUser.id}/>;
                            })}
                    </Infinite>        
                </ul>
            </div>
        );
    }
});

module.exports = Following;