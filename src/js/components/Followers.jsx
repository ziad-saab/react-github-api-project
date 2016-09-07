var React = require('react');
// We're using jQuery to make AJAX calls because that's what we're used to for the moment
// Later on you might want to use a lighter library that only does AJAX, like isomorphic-fetch or superagent
var $ = require('jquery');
var Infinite = require('react-infinite');

var GithubUser = require('./GithubUser');

var Followers = React.createClass({
    propTypes: {
        // PropTypes.shape is like PropTypes.object but lets you define what's expected to be inside the object
        params: React.PropTypes.shape({
            username: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function() {
        return {
            page: 1,
            loading: false,
            followers: []
        };
    },
    /*
    This method will be called by React after the first render. It's a perfect place to load
    data with AJAX. This User component gets mounted in the DOM as soon as the URL is /user/:username
    
    When that happens, react-router will pass a `params` prop containing every parameter in the URL, just like
    when we get URL parameters in Express with req.params. Here, it's this.props.params. Since we called our route
    parameter `username`, it's available under this.props.params.username
    
    We're using it to make an API call to GitHub to fetch the user data for the username in the URL. Once we receive
    the data -- in the callback -- we call `setState` to put the user data in our state. This will trigger a re-render.
    When `render` gets called again, `this.state.user` exists and we get the user info display instead of "LOADING..."
    */
    fetchData: function() {
        if (this.state.done) {return;}
        this.setState({loading: true});
        
        var that = this; // What's this?? Make sure you remember or understand what this line does
        var page = this.state.page;
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/followers?per_page=25&page=${page}&access_token=ef35a1650fec29e13d9782afc34c6138b0213ec8`)
            .then(
                function(followers) {
                    if (followers.length === 0) {
                        that.setState({
                            loading: false,
                            done: true
                        });
                    }
                    else {
                        // Why that.setState instead of this.setState??
                        that.setState({
                            followers: that.state.followers.concat(followers),
                            page: page + 1,
                            loading: false
                        });    
                    }
                    
                }
            );
    },
    render: function() {
        var items = this.state.followers.map(function(user) {
            return <div className="followers-list__item" key={user.id}><GithubUser user={user}/></div>;
        });
        
        // Look in app.css for the styles that make this look like it does
        return (
            <div className="followers-page">
                <h3>Followers of {this.props.params.username}</h3>
                <Infinite loadingSpinnerDelegate={<div className="loading"/>} isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} infiniteLoadBeginEdgeOffset={this.state.done ? undefined : 100} elementHeight={41} useWindowAsScrollContainer>
                    {items}
                </Infinite>
            </div>
        );
    }
});

module.exports = Followers;