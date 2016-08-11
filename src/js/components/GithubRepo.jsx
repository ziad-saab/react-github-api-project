var React = require('react');


var GithubRepo = React.createClass({
   render: function(){
       return(
            <div>
                <a href={this.props.repo.html_url}>
                    {this.props.repo.owner.login}/{this.props.repo.name}
                    <div>
                        {this.props.repo.stargazers_count}
                    </div>
                </a>
            </div>
        );
   }
});

module.exports = GithubRepo;