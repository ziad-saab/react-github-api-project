import React from 'react';
import GithubUser from "./GithubUser";
import Infinite from 'react-infinite';

class Followers extends React.Component {

    constructor(){
        super();
        this.state = {
            page: 1,
            loading: false,
            followers: []
        };
    }

    fetchData(){
        var API_KEY = "4d0826ee9c11ced776a6c9ff649d34fc0f30580f";

        this.setState({
            loading: true
        });

        fetch(`https://api.github.com/users/${this.props.params.username}/followers?access_token=${API_KEY}&page=${this.state.page}&per_page=50`)
            .then( r => r.json() )
            .then( (data) => {
                this.setState({
                    followers : this.state.followers.concat(data), //data already comes as an array
                    loading : false,
                    page : this.state.page + 1
                });
            });
    }

    render(){

        return (
            <div className="followers-page" >
                <h2>Followers of {this.props.params.username}</h2>
                {this.state.loading === true ?
                    <div>
                        <h2>Loading followers of {this.props.params.username}</h2>
                    </div> : null}
                <Infinite isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData.bind(this)} useWindowAsScrollContainer={true} elementHeight={350} infiniteLoadBeginEdgeOffset={100}>
                    {
                        this.state.followers.map(
                            /* INSERT CODE HERE TO RETURN A NEW <GithubUser/> */
                            function (arrayItem) {
                                return (<GithubUser user={arrayItem} key={arrayItem.id}/>);
                            }
                        )
                    }
                </Infinite>
            </div>
        );

    }
}

export default Followers;