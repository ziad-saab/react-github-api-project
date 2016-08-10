var React = require('react');
var history = require('react-router').browserHistory;

/*
This component displays a form where the user can enter a GitHub username
When they submit the form either by pressing ENTER or clicking the button,
we will use react-router's history.push function to push a new URL to the history.

This will have as an effect to navigate to a new URL, which will display the User component
*/
var Search = React.createClass({
    _handleSubmit: function(e) {
        e.preventDefault();
        history.push(`/user/${this.refs.userInput.value}`);
    },
    render: function() {
        return (
            <div className="search-page">
                <h2>Enter a GitHub username</h2>
                <form onSubmit={this._handleSubmit}>
                    <input ref="userInput" className="search-page__input" type="text" />
                    <button className="search-page__button">Search</button>
                </form>
            </div>
        );
    }
});

module.exports = Search;