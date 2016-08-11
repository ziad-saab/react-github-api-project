var React = require('react');
var $ = require('jquery');
var Infinite = require('react-infinite');

var GithubRepo = require('./GithubRepo');

var Repos = React.createClass({
    getInitialState: function() {
        return {
            page: 1,
            loading: false,
            repos: []
        };
    },
    fetchData: function() {
        
        this.setState({
            loading: true
        });
        
        var url = `https://api.github.com/users/${this.props.params.username}/repos?access_token=6d7ffda3c063706d6b19b0321903ee347f9c1d8b&page=${this.state.page}&per_page=50`;
        var that = this;
        
        $.getJSON(url).then(
            function(response) {
                that.setState({
                    repos: that.state.repos.concat(response),
                    loading: false,
                    page: that.state.page + 1
                });
            });
         
    },
    render: function() {
        return (
            <div>
                <h3>{this.props.params.username} public repos</h3>
                <ul>
                    <Infinite 
                        isInfiniteLoading={this.state.loading}
                        onInfiniteLoad={this.fetchData} 
                        useWindowAsScrollContainer
                        infiniteLoadBeginEdgeOffset={100}
                        elementHeight={50}>
                            {this.state.repos.map(function(eachRepo){
                               return <GithubRepo repo={eachRepo} key={eachRepo.id}/>;
                            })}
                    </Infinite>        
                </ul>
            </div>
        );
    }
});

module.exports = Repos;


HELLO HELLO HELLO