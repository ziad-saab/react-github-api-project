import React from 'react';
import GithubUser from "./GithubUser";
import Infinite from 'react-infinite';

class Followers extends React.Component {

    constructor(){
        super();
        this.state = {
            page: 1,
            loading: false,
            followers: [],
            infiniteLoadBeginEdgeOffsetState : 10
        };
    }

    fetchData(){
        var API_KEY = "";

        this.setState({
            loading: true
        });

        fetch(`https://api.github.com/users/${this.props.params.username}/followers?access_token=${API_KEY}&page=${this.state.page}&per_page=50`)
            .then( r => r.json() )
            .then( (data) => {

                if (data.length > 0){ //i.e. if we have more new array items from the fetch
                    this.setState({
                        followers : this.state.followers.concat(data), //data already comes as an array
                        loading : false,
                        page : this.state.page + 1
                    });
                }
                else { //i.e. if WE DO NOT have any more new array items then stop loading from the infinite scroll
                    this.setState({
                        infiniteLoadBeginEdgeOffsetState: undefined
                    });
                }


            });
    }

    render(){

        return (
            <div className="followers-page" >
                <div className="followers-header">
                    <h2>Followers of {this.props.params.username}</h2>
                </div>
                {this.state.loading === true ?
                    <div className="followers-header">
                        <h2>Loading followers of {this.props.params.username}</h2>
                    </div> : null}
                <Infinite className="followers-scroll" isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData.bind(this)} useWindowAsScrollContainer={true} elementHeight={50} infiniteLoadBeginEdgeOffset={this.state.infiniteLoadBeginEdgeOffsetState} loadingSpinnerDelegate={ <div className="loading-div"> <img src="https://media.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif" alt="Loading" width="42" height="42"/> </div>} >
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