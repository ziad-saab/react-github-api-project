var React = require('react');
var Link = require('react-router').Link;

var GithubUser = React.createClass({
    propTypes: {
      user: React.PropTypes.object.isRequired  
    },
    render: function(){
        if (!this.props.user){
            return <div>LOADING... </div>;
        }       
        return(
            <div className="followers_box">
                <Link className="follower_link" to={"/user/" + this.props.user.login}>
                    <img className="follower-info__avatar" src={this.props.user.avatar_url}/>
                    <div>{this.props.user.login}
                    </div>
                </Link>
            </div>
        );
    }
});

module.exports = GithubUser;