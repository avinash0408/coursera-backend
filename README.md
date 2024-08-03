# userAuth
userAuth does a basic user authentication.

# Steps to use
1. Clone this repo
2. cd userAuth/
3. npm install
4. open the config.env file and add your DB url
5. npm start (or) nodemon server.js

# What userAuth can do?
1. Signup a new user
2. Login as a user. Once you login, your authenticated jwt gets added in your cookies.
3. Once you login, you can now access the user dashboard which will fetch all the users in the database.
4. Once you are done, you can log out.

# Routes
1. Signup -> /signup
2. Login -> /signin
3. get users -> /users
4. logout -> /signout

# FAQs
1. You can't access /users endpoint if you are not logged in.
