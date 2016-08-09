var React = require('react');
var Link = require('react-router').Link;

/*
This is the layout component. It's displayed by the top-level Route
this.props.children will correspond to the current URL's component.

If the URL is only / then the IndexRoute's component will be the child (Search component)
If the URL is /user/:username then the User component will be displayed.
*/
var App = React.createClass({
    render: function() {
        return (
            <div className="main-app">
                <header className="main-header">
                    <h1><Link to="/">React GitHub Project</Link></h1>
                </header>
                <main className="main-content">
                    {this.props.children}
                </main>
            </div>
        );
    }
});

module.exports = App;