var React = require('react');
var $ = require('jquery');

var GithubUser = require('./GithubUser');

var Repos = React.createClass({
//     getInitialState: function() {
//         return {};
//     },
//     fetchData: function() {
//         var url = `https://api.github.com/users/${this.props.params.username}/followers?access_token=6d7ffda3c063706d6b19b0321903ee347f9c1d8b`;
//         var that = this;

//         $.getJSON(url).then(
//             function(response) {
//                 that.setState({
//                     followers: response
//                 });
//             });
//     },
//     componentDidMount: function(){
//         this.fetchData();
//     },
//     componentDidUpdate: function(prevProps){
//         if(prevProps.params.username !== this.props.params.username){
//             this.fetchData();
//         }
//     },
    render: function() {
//         if (!this.state.followers) {
//             return <div>LOADING FOLLOWERS...</div>;
//         }
//         return (
//             <div className="followers-page">
//                 <h3>Followers of {this.props.params.username}</h3>
//                 <ul>
//                     {this.state.followers.map(function(eachUser){
//                       return <GithubUser user={eachUser} key={eachUser.id}/>;
//                     })}
//                 </ul>
                
//             </div>
//         );
    }
});

module.exports = Repos;