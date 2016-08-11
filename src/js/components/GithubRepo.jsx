var React = require('react');


var GithubRepo = React.createClass({
   render: function(){
       return(
            <div>
                <a className="github_repo_link" href={this.props.repo.html_url}>
                    <div className="github_repo_loginAndRepoName">
                        {this.props.repo.owner.login}/{this.props.repo.name}
                    </div>
                    <div className="github_repo_stargazersCount">
                        {this.props.repo.stargazers_count}&#9733;
                    </div>
                </a>
            </div>
        );
   }
});

module.exports = GithubRepo;