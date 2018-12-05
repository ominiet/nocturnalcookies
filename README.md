# Nocturnal Cookies

This is a Web Application that is created for Nocturnal Cookies
as a tool to facilitate the buying and selling of cookies on a
college campus. Features include:
* Admin Console for employees of Nocturnal Cookies to be able to 
manage and complete orders 
* Owner console that will allow the Owner of the site to create and delete users
* Form for users to enter values and order cookies

## Quick Start
### Getting Node

This project was created using node/npm. I used node@10.10.0 and 
npm@6.4.1. You can download node at the 
[node website](https://nodejs.org/en/ "NodeJS") or from your OS
package manager (if you have one installed).
##### Windows ([Chocolatey](https://chocolatey.org/ "Chocolatey package manager website")):
`choco install node`
##### Mac ([Homebrew](https://brew.sh/ "Homebrew package manager website")):
`brew install node`

### Clone and run the app
1. Run the following command to clone the application to your machine

    `git clone https://github.com/ominiet/nocturnalcookies.git`  
2. `cd nocturnal cookies`
3. Use `npm install` to download all the dependencies (do this the first
time you run the app)
4. Use `npm start` to run the application (do this every time you run the app)

## Rubric
1. Authorization - We have implemented 2 types of users in our project:
    * Admin - Has access to admin panel and ability to view, modify, and delete
    orders
    * Owner: Has access to all admin routes and routes to view and manage
    all other users
2. Database - We have connected to an mLab instance for production and a
separate instance for testing
3. Authentication - You may use the login button in the footer to access the
admin login page
4. Deployed - The link to our deployed app is (https://nocturnal-cookies.herokuapp.com)
    * Credentials for the owner are: 
        * Username: owner
        * Password: pass
5. Code Review - Testing was performed (Go to testing section of README to see more)
and we have separated all code files in to logical locations
6. General - Plan changes are in the plan section below
7. User Stories - User stories are in the user stories section below


## Testing

We used mocha as our testing framework and chai as our assertion library to test
our backend API. Given time constraints, we were not able to test every potential
scenario, but our tests do verify that our API does work.

#### Running the tests
1. You will likely have to run:
   
   `npm install --dev`
2. Once the dependencies have downloaded, you may run from the base directory:

    `npm test`

This will connect you to a test database and perform some unit tests on the API

## Plan
#### Changes:
* We have updated some of our user stories compared to the original document
These changes will be documented in the User Stories section
* Our Tech stack has been updated based on team preference and familiarity 
and has changed to:

| Tables            | Old      | New     |
| ----------------- |:--------:|:-------:|
| **Frontend**      | _React_  |_Angular_|
| **Backend**       | Node     | Node    |
| **Routing**       | Express  | Express |
| **Database**      | MongoDB  | MongoDB |
| **DB Hosting**    | mLab     | mLab    |
| **Server Hosting**| Heroku   | Heroku  |

* We had also decided to move away from including the Announcements module
from our final deliverable since we felt it was too similar to the order
management in terms of CRUD and user stories.
    * Instead, We opted to create the owner classification that had
    additional privileges compared to a regular admin user
    
#### User Stories
**Order**
1. Create
    1. As a user, I want to be able to submit cookie orders through a form
        1.	User visits site (No logon required)
        2.	User goes to order tab or clicks on order button
        3.	User fills out order info and submits
        4.	User gets a confirmation with their order details
2. Read
    1. As an admin I want to be able to see a list of all orders in an organized way
        1. Admin logs into a special account
        2. Admin goes to a dashboard-type page
        3. Admin can view and filter orders to prepare them for delivery
    2. As an admin I want to be able to see the details of a specific order
        1. Admin logs in
        2. Admin goes to dashboard
        3. Admin clicks on one of the orders in the list
        4. Admin sees a popup of all the order details
3. Update
    1. As an admin, I want to be able to correct orders that may have errors in them
        1. Admin goes to dashboard
        2. Admin can view the details of any order
        3. Admin can click a button to change the status of the order to delivered
4. Delete
    1. As an admin, I want to be able to delete wrong/faulty orders or posts
        1.	Admin goes to dashboard
        2.	Admin can delete specific orders
        
**Users**
1. Create
    1. As the Owner, I want to be able to create new users when I hire employees
        1.	Owner logs in
        2.	Owner uses navbar to go to Create User Page
        3.	Owner creates new user account
        4.	Owner shares account information with new employee
2. Read
    1. As the Owner, I want to see a list of all users on the website
        1. Owner uses login button like an admin
        2. Owner clicks nav button only visible to them that redirects them
        3. Owner can now see a list of all users
4. Delete
    1. As the Owner, I want to be able to delete user accounts that are no
    longer in use
        1.	Owner goes to owner dashboard
        2.	Owner clicks button to delete specific user

## Info for Developing
We are going to use the method we learned in Software Engineering to maintain 
the repository. This will entail keeping a "master" branch which will contain
the most recent working version of our web app, a "development" (branched
from "main") which will contain our in-progress next version 
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





