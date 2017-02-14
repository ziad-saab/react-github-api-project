# React + GitHub API project

In this project, we're going to take a small, existing React application and add new features to it.

Here's what the application will look like once you are done:

![react github project](http://i.imgur.com/cSckwUo.gif)

The code you are given for the project implements the search form and the loading of basic user info. You'll have to do all the rest.

Let's take a look at the code that's already there. Many of the starter files should already be familiar to you if you completed [the previous workshop](https://github.com/ziad-saab/react-intro-workshop).

* `package.json`: Configuration file for NPM, contains dependencies and project metadata
* `.gitignore`: Files that should be ignored by Git. `node_modules` can always be regenerated
* `public/index.html`: File that gets served thru Webpack after having been filled in
* `src/index.js`: This file is the entry point for the app. It puts our app on the screen!
* `src/components/*`: All the components of our application.
* `src/index.css`: The styles for our app. Check it out to see how your starter app is being styled, and add to it to complete the project. Notice that we don't `<link>` this CSS from the index? How does this work?? Make sure you understand!!!

**To get started coding on this project, remember the following steps**:

1. `npm install` the first time you clone this repo
2. `npm start` anytime you want to start developing. This will watch your JS files and re-run webpack when there are changes
3. Start coding!

In `index.js` we have the following route structure:

```javascript
<Route path="/" component={App}>
  <IndexRoute component={Search}/>
  <Route path="user/:username" component={User}/>
</Route>
```

The top route says to load the `App` component. Looking at the code of `App.jsx`, you'll see that its `render` method outputs `{this.props.children}`. If the URL happens to be only `/`, then React Router will render an `<App/>` instance, and will pass it a `<Search/>` as its child. If the route happens to be `/user/:username`, React Router will display `<App/>` but will pass it `<User />` as a child.

When the `Search` component is displayed, it has a form and a button. When the form is submitted, we use React Router's `browserHistory` to **programmatically change the URL**. Look at the `Search`'s `_handleSubmit` method to see how that happens.

Once we navigate to the new URL, React Router will render a `User` component. Looking at the `componentDidMount` method of the `User`, you'll see that it does an AJAX call using `this.props.params.username`. The reason why it has access to this prop is because the Router passed it when it mounted the component.

The AJAX call is made to `https://api.github.com/users/{USERNAME}` and returns the following information:

```json
{
  "login": "gaearon",
  "id": 810438,
  "avatar_url": "https://avatars.githubusercontent.com/u/810438?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/gaearon",
  "html_url": "https://github.com/gaearon",
  "followers_url": "https://api.github.com/users/gaearon/followers",
  "following_url": "https://api.github.com/users/gaearon/following{/other_user}",
  "gists_url": "https://api.github.com/users/gaearon/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/gaearon/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/gaearon/subscriptions",
  "organizations_url": "https://api.github.com/users/gaearon/orgs",
  "repos_url": "https://api.github.com/users/gaearon/repos",
  "events_url": "https://api.github.com/users/gaearon/events{/privacy}",
  "received_events_url": "https://api.github.com/users/gaearon/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Dan Abramov",
  "company": "Facebook",
  "blog": "http://twitter.com/dan_abramov",
  "location": "London, UK",
  "email": "dan.abramov@me.com",
  "hireable": null,
  "bio": "Created: Redux, React Hot Loader, React DnD. Now helping make @reactjs better at @facebook.",
  "public_repos": 176,
  "public_gists": 48,
  "followers": 10338,
  "following": 171,
  "created_at": "2011-05-25T18:18:31Z",
  "updated_at": "2016-07-28T14:41:02Z"
}
```
[GitHub API documentation for Users](https://developer.github.com/v3/users/)

In the `render` method of the `User` component, we are displaying the user info based on the received result, and we have three links that don't lead anywhere for the moment:

![links](http://i.imgur.com/3CFG1ir.png)

If you click on followers, notice that the URL of the page changes to `/users/:username/followers`. If you have your dev tools open, React Router will give you an error message telling you that this route does not exist.

**The goal of this workshop** is to implement the three links above. To do this, we'll start by implementing the followers page together with step by step instructions. Then, your job will be to implement the two remaining screens and fix any bugs.

## Implementing the Followers page
When clicking on the followers link in the UI, notice that the URL changes to `/user/:username/followers`. Currently this results in a "not found" route. Let's fix this.

![followers page](http://i.imgur.com/IwkBOUc.png)

### Step 1: adding the route
In `index.js`, you currently have your user route setup like this:

```javascript
<Route path="user/:username" component={User} />
```

Let's change it to a route with a nested route

```javascript
<Route path="user/:username" component={User}>
  <Route path="followers" component={Followers} />
</Route>
```

For this to do anything, we first have to implement the `Followers` component.

### Step 2: adding the `Followers` component
Create a component called `Followers`. Since this component is also a route component, it will receive the same `this.props.params.username`. In this component, we're eventually going to do an AJAX call to grab the followers of the user.

For the moment, create the component only with a `render` function. In there, use your props to return the following:

```html
<div className="followers-page">
  <h3>Followers of USERNAME</h3>
</div>
```

### Step 3: displaying the nested component inside its parent
When the URL changes to `followers`, we want to display the followers alongside the current `User` component. **This is why we are nesting the followers route inside the user route.**

To reflect this nesting in our tree of components, we have to add a `{this.props.children}` output to our `User` component.

Modify the `User` component to make it display its children just before the closing `</div>` in the `render` method.

When this is done, go back to your browser. Search for a user, and click on FOLLOWERS. The followers component should be displayed below the user info.

### Step 4: loading GitHub data in the `Followers` component:
We want to load the followers of the current user as soon as the `Followers` component is mounted in the DOM. In the `componentDidMount` of `Followers`, use `fetch` to make a request to GitHub's API for the followers. Simply add `/followers` to the GitHub API URL for the user e.g. https://api.github.com/users/ziad-saab/followers

In the callback to your AJAX request, use `setState` to set a `followers` state on your component.

### Step 5: displaying the followers data in the `Followers` component:
Using the `this.state.followers` in your `render` method, display the followers that you receive from GitHub. We'll do this in a few steps.

1. Create a new pure component called `GithubUser`. It should receive a `user` prop, and use its `avatar_url` and `login` properties to display one GitHub user. The whole display should link back to that user's page in your app, using React Router's `Link` component. Here's what a sample output of your `GithubUser` component should look like:

```javascript
<Link to="/user/ziad-saab">
  <img src="AVATAR URL"/>
  ziad-saab
</Link>
```

And here's a visual example of four `GithubUser` instances (you can use `vertical-align` in your CSS to align the image and the name):

![GithubUser component](http://i.imgur.com/dWp7NIc.png)

2. In `Followers`, import your `GithubUser` component.
3. In the `render` method of `Followers`, use `map` to take the array at `this.state.followers`, and map it to an array of `<GithubUser />` elements, passing the `user` prop. The code of `Followers`' `render` method should look like this:

```javascript
if (!this.state.followers) {
return <div>LOADING FOLLOWERS...</div>
}

return (
<div className="followers-page">
    <h2>Followers of {this.props.params.username}</h2>
    <ul>
        {this.state.followers.map(/* INSERT CODE HERE TO RETURN A NEW <GithubUser/> */)}
    </ul>
</div>
);
```

Having done this, you should have a full `Followers` component ready to go.

### Step 6: :warning: A wild bug has appeared!
Try to click on a follower in the followers list. Notice that the URL changes to match the user you clicked, but the display does not change to reflect that. [We had the same problem in the previous workshop](https://github.com/ziad-saab/react-intro-workshop#advanced-inter-component-communication). If you recall, it was due to us fetching the data in `componentDidMount`, but sometimes a component's props change while it's still mounted.

Here's what's happening in this case:

1. User is on `/` and does a search for "gaearon"
2. User gets redirected to `/user/gaearon` and React Router **mounts** an instance of the `User` component, passing it "gaearon" as `this.props.params.username`. The `User` component's `componentDidMount` method kicks in and fetches data with AJAX
3. User clicks on FOLLOWERS, gets redirected to `/users/gaearon/followers`. React Router keeps the instance of `User` mounted, and passes it a new instance of `Followers` as `this.props.children`. The `Followers` instance is mounted and its `componentDidMount` kicks in, fetching the followers data.
4. User clicks on one follower called "alexkuz" and the URL changes to `/users/alexkuz`. React Router **does not mount** a new `User` instance. Instead, it changes the `params` prop of the existing `User` instance to make it `{username: "alexkuz"}`.
5. Since `componentDidMount` of `User` is not called, no AJAX call occurs.

To fix this bug, follow the same instructions you did in yesterday's workshop:

1. Move the logic from `componentDidMount` to another method called `fetchData`
2. Call `fetchData` from `componentDidMount`
3. Implement `componentDidUpdate` and call `fetchData` again but **conditionally**, only if the `username` prop has changed.

:warning: `componentDidUpdate` gets called **frequently**, whether the props or the state changed. That's why it's important to always check the new vs. old state/props before calling `setState` again.

## Implementing the following page
Implementing the following page is an exact copy of the followers page. The only differences are:

1. Use `/following` instead of `/followers` in your AJAX call
2. The title of the page and its URL will be different

When displaying the following list, note that you can -- and *should* -- reuse the same `GithubUser` presentational component.

![following page](http://i.imgur.com/1bFxwc7.png)

## Implementing the repos page
Implementing the repos page is similar to the other two pages you implemented. The only differences are:

1. Use `/repos` in your AJAX call
2. Title and URL are different
3. Instead of using a `<Link>` element to link to the repo, use a regular `<a href>` since you're linking to an external resource.
4. You'll need a new `GithubRepo` component that will act similar to the `GithubUser` component you used to display the followers/following.

![repos page](http://i.imgur.com/kxvnCun.png)

When you finish everything, your end-result should look and behave like this:

![react github project](http://i.imgur.com/cSckwUo.gif)


# Challenge: infinite scrolling!
:warning: If you're going to do this challenge, I suggest you start it in a separate branch and commit often. This way you always have somewhere to go back to when "things were working".

For this challenge, we're going to use the [`react-infinite`](https://github.com/seatgeek/react-infinite) component to load extra data from the GitHub API.

Right now, if you look at a profile with a lot of followers, you'll notice that GitHub API only returns the first 25 followers. The API has a `per_page` query string parameter that you can set, but the maximum number of items per page is still 100. If someone has more than 100 followers, you'd have to do many requests to get all of them.

React Infinite will take care of most of the heavy lifting for us. First of all, it's never a good idea to have thousands of elements on the page if the user is only seeing a handful. React Infinite will be efficient in showing only the elements that are in the viewport. Second, React Infinite will detect the scroll position and can fire off a callback when the scrolling reaches the edge of your container.

All you have to do is provide React Infinite with the callback function that will load your data, and pass your items to the `<Infinite>` component.

Let's do it step by step for **followers** and then you can reproduce it for the other pages. This is what your app will look like once you are done:

![infinite scroll](http://i.imgur.com/Y4D2d37.gif)

## Step 0: :eyeglasses: reading the documentation!
[Read the documentation for React Infinite](https://github.com/seatgeek/react-infinite#react-infinite) to get an idea of what's going on. Once you have read the documentation, make sure to install the `react-infinite` package from NPM.

## Step 1: modifying the `Followers` component
Your `Followers` component currently loads its data on `componentDidMount`. It turns out that if you mount an `<Infinite>` component without any data, it will automatically call your callback function to fetch more data.

### Step 1.1: Adding new state data to `Followers`
In the `constructor` method of `Followers`, let's add a few more pieces of state. Let's add a `page` state and initialize it to `1`. Add another state called `loading` and set it to `false`. Finally, add a `followers` state and set it to an empty array.

### Step 1.2: Change the `componentDidMount` method name to `fetchData`. In your AJAX call, add two query string parameters to the GitHub API URL: `page` will come from your state, and `per_page` can be set to anything between 1 and 100. Set it to 50. Your URL should look like this:

```
https://api.github.com/users/USER/followers?access_token=XXX&page=1&per_page=50
```

### Step 1.3: Loading...
Before doing the AJAX call in `fetchData`, set the `loading` state to `true`.

### Step 1.4: Change the callback to the AJAX call
In the callback of the AJAX call, you're currently setting the `followers` state to the response you receive from the GitHub server. Instead, since you already have a followers array, use the `concat` method to add the new items to your existing `this.state.followers` array. Additionally, set the `loading` state to `false`, and the `page` state to whatever it currently is `+ 1`.

### Step 1.5: Importing the library
Load `react-infinite` in your `Followers` component, and assign it to the variable `Infinite`.

### Step 1.6: Change the `render` method
In the `render` method, we're currently checking if `this.state.followers` is truthy. We don't need to do that anymore, because we'll always have a list of followers.

Replace your container with an `<Infinite>` container, and pass it the following props:

* `isInfiniteLoading`: take it from your `loading` state
* `onInfiniteLoad`: point to your `fetchData` method
* `useWindowAsScrollContainer`: this prop doesn't have a value! It will be set to `true` automatically
* `elementHeight`: to scroll efficiently, React Infinite needs to know the height of an element. Use your browser's inspector to find the approximate height of your `GithubUser` elements. It's not perfect, but it'll do for now.
* `infiniteLoadBeginEdgeOffset`: this sets the amount of pixels from the edge of your container at which more data will be loaded. Set it to `100` so that the data starts loading before you reach the edge (bottom) of the window.

Your `render` code should have the following in it now:

```javascript
<Infinite ...all the props...>
  {this.state.followers.map(...)}
</Infinite>
```

After you've done all these changes, your infinite scroll should be working. React Infinite will call your `fetchData` method as often as needed to display new elements. Every time a new page is fetched, you're incrementing the `page` state so that future page fetches will fetch the next page. Since you're `concat`ing followers, your list will keep growing until there is no more data.

## Optional step: adding a loading indicator
React Infinite lets you use a [`loadingSpinnerDelegate`](https://github.com/seatgeek/react-infinite#react-node-loadingspinnerdelegate). It's basically a React element that will be displayed below the list when `loading` is `true`.

You can do this as simply as `loadingSpinnerDelegate={<div>LOADING</div>}` or you can go for a CSS animation, or even a GIF.

## Finally
When you are done, make sure to add infinite scrolling to the following and repos pages. They should work exactly the same way :)
