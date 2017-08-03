import React from 'react';
import { Link } from 'react-router';

class Followers extends React.Component {
    
    render() {
        // console.log(this.props.params.username)
        return (
            <div className="followers-page">
                <h3>Followers of {this.props.params.username}</h3>
            </div>
        );
    }
};

export default Followers;

