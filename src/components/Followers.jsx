import React from 'react';
import GithubUser from "./GithubUser";

class Followers extends React.Component {

    constructor(){
        super();
        this.state = {};
    }

    componentDidMount(){
        var API_KEY = "";
        fetch(`https://api.github.com/users/${this.props.params.username}/followers?access_token=${API_KEY}`)
            .then( r => r.json() )
            .then( (data) => {
                this.setState({followers : data});
            });
    }

    render(){
        if (!this.state.followers) {
            return (<div>
                LOADING FOLLOWERS... OF {this.props.params.username}
                </div>
            );
        }
        else {
            return (
                <div className="followers-page">
                    <h2>Followers of {this.props.params.username}</h2>
                    <ul>
                        {
                            this.state.followers.map(
                            /* INSERT CODE HERE TO RETURN A NEW <GithubUser/> */
                                function (arrayItem) {
                                    return (<GithubUser user={arrayItem} key={arrayItem.id}/>);
                                }
                            )
                        }
                    </ul>
                </div>
            );
        }
    }
}

export default Followers;