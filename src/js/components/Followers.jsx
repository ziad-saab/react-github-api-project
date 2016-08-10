var React = require('react');

var Followers = React.createClass({
    render: function() {
        return (
            <div className="followers-page">
              <h3>Followers of </h3>
               {this.props.params.username}
            </div>
        );
    }
});

module.exports = Followers;