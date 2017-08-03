/*
What is this sorcery?? Importing a CSS file in JavaScript?
Make sure you understand what's going on here!!!
*/
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Search from './components/Search';
import User from './components/User';
import Followers from './components/Followers';
import Following from './components/Following';

/*
Rendering a router will output the right component tree based on the current URL.
Nested routes' components will be passed down to the parent as `this.props.children`

If the URL is /, then <App/> will be rendered, and this.props.children will be <Search/> (this is the IndexRoute)
If the URL is /user/ziad-saab then <App/> will be rendered, and this.props.children will be <User/>
The <User/> instance will be passed a prop called `params`. It will be an object with `{username: 'ziad-saab'}`
*/
const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            {/*IndexRoute makes component {Search} A child of component {App}, {this.props.children can be used in App}*/}
            {/*diff; Route needs a path but IndexRoute doesnt*/}
            {/*See stackoverflow answer below for better explaination*/}
            <IndexRoute component={Search}/>
            {/*component tag used to define which component to render */}
            {/*this is a child but will have path /user/:username*/}
            <Route path="user/:username" component={User}>
                {/*this is a child but will have path /user/:username/followers, So params.username is also valid*/}
                <Route path="followers" component={Followers} />
                <Route path="following" component={Following} />
            </Route>
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('root'));

/*
<Route path="/" component={App}>
  <IndexRoute component={Home}/>
  <Route path="about" component={About}/>
</Route>
|----------------VS----------------|
<Route path="/" component={App}>
  <Route path="home" component={Home}/>
  <Route path="about" component={About}/>
</Route>

In the top example, going to / would render App with Home passed as a child. 
//MY NOTE: 
//About is also a child that will be passed BUT NOT rendered as the path dont match  
In the bottom example, going to / would render App with neither Home nor About being 
rendered, since neither of their paths match.
*/