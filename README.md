# Nocturnal Cookies

This is a Web Application that is created for Nocturnal Cookies
as a tool to facilitate the buying and selling of cookies on a
college campus. Features include:
* Admin Console for employees of Nocturnal Cookies to be able to 
manage and complete orders 
* To Be
* Finished Later

## Quick Start
### Getting Node

This project was created using node/npm. I used node@10.10.0 and 
npm@6.4.1. You can download node at the 
[node website](https://nodejs.org/en/ "NodeJS") or from your OS
package manager (if you have one installed).
##### Windows:
`choco install node`
##### Mac:
`brew install node`

### Clone and run the app
1. Run the following command to clone the application to your machine

    `git clone https://github.com/ominiet/nocturnalcookies.git`  
2. `cd nocturnal cookies`
3. Use `npm install` to download all the dependencies (do this the first
time you run the app)
4. Use `node app` to run the application (do this every time you run the app)

## Info for Developing
We are going to use the method we learned in Software Engineering to maintain 
the repository. This will entail keeping a "master" branch which will contain
the most recent working version of our web app, a "development" (branched
from "main")which will contain our in-progress next version 
of the web app, and multiple "feature" branches (branched from "development").

This will ensure that there will always be a workable version of the web app to
fall back on and revert to if necessary, and will only allow usable changes to
make it to the master branch. Having separate feature branches will also help
prevent merge conflicts when combining all of the code into the development branch.

### Workflow

##### Creating a new feature branch
1. From the nocturnalcookies repo on GitHub, select the `Branch: master` button
and select development
2. Click the same button and type in the name of the feature branch you wish
to create \<branchName\>
3. In your Command Line, navigate to your project folder and type  
`git pull`
4. `git checkout <branchName>`
5. You are now on your created branch that was created from development
##### Committing code
1. When you are at a good stopping point and want to send code to your feature
branch, type in your terminal  
`git status`
2. Use `git add <filename>` to add files you wish to commit.  
    **Do Not** use `git add .`
3. When you have added all of the files you want, use  
`git commit -m "<commit message>"`
4. Use `git push` to send the code to GitHub.
##### Pull Requests
1. Go to the branch on the repo on GitHub
2. Select development on the "base" drop-down and your branch on 
the "compare" drop-down.
3. Follow the on screen instructions to create the pull request





