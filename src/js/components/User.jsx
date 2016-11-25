var React = require('react');
// We're using jQuery to make AJAX calls because that's what we're used to for the moment
// Later on you might want to use a lighter library that only does AJAX, like isomorphic-fetch or superagent
var $ = require('jquery');
var Link = require('react-router').Link;

var User = React.createClass({
    propTypes: {
        // PropTypes.shape is like PropTypes.object but lets you define what's expected to be inside the object
        params: React.PropTypes.shape({
            username: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function() {
        return {};
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
        var that = this; // What's this?? Make sure you remember or understand what this line does
        //that = this is a way of making the this value, our object, available elsewhere since
            //this refers to the current scope, i.e. it enables this' value to be used in nested functions
        
        $.getJSON(`https://api.github.com/users/${this.props.params.username}?access_token=8dbd67ccdec639d5803b020db060a7e3d5be27cc`)
                                                                            // have your access token here
            .then(
                function(user) {
                    // Why that.setState instead of this.setState??
                        // because that has the value of our component whereas this, unless bind is used
                        //will only have a value within the function's scope aka this will be the ajax call
                    that.setState({
                        user: user
                    });
                }
            );
    },
    componentDidMount: function(){
        this.fetchData();
    },
    componentDidUpdate: function(prevProps){
        // console.log(prevProps.id, "killer queen")
        if(prevProps.username !== this.props.params.username){
            this.fetchData();
        }
    },
    /*
    This method is used as a mapping function. Eventually this could be factored out to its own component.
    */
    renderStat: function(stat) {
        return (
            <li key={stat.name} className="user-info__stat">
                <Link to={stat.url}>
                    <p className="user-info__stat-value">{stat.value}</p>
                    <p className="user-info__stat-name">{stat.name}</p>
                </Link>
            </li>
        );
    },
    render: function() {
        // If the state doesn't have a user key, it means the AJAX didn't complete yet. Simply render a LOADING indicator.
        if (!this.state.user) {
            return (<div className="user-page">LOADING...</div>);
        }
        
        // If we get to this part of `render`, then the user is loaded
        var user = this.state.user;
        
        // Gather up some number stats about the user, to be used in a map below
        var stats = [
            {
                name: 'Public Repos',
                value: user.public_repos,
                url: `/user/${this.props.params.username}/repos`
            },
            {
                name: 'Followers',
                value: user.followers,
                url: `/user/${this.props.params.username}/followers`
            },
            {
                name: 'Following',
                value: user.following,
                url: `/user/${this.props.params.username}/following`
            }
        ];
        
        // Look in app.css for the styles that make this look like it does
        return (
            <div className="user-page">
                <div className="user-info">
                    <Link className="user-info__text" to={`/user/${user.login}`}>
                        <img className="user-info__avatar" src={user.avatar_url}/>
                        <h2 className="user-info__title">{user.login} ({user.name})</h2>
                        <p className="user-info__bio">{user.bio}</p>
                    </Link>
                
                    <ul className="user-info__stats">
                        {stats.map(this.renderStat)}              
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = User;