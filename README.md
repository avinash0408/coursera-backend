# Coursera-backend
This project is to develop backend functionality for Coursera kindof applications where a user can buy and visit the courses.

# Steps to use
1. Clone this repo
2. cd coursera-backend/
3. npm install
4. open the config.env file and add your DB url
5. npm start (or) nodemon server.js
6. Open postman and start testing..

#postman requests
1.Signup user - http://localhost:3000/signup
    sample payload :    {
                            "username": "user2",
                            "password": "Welcome1",
                            "name": "second  User"
                        }
{for admin user please pass isAdmin:true in payload}
2.Signin user - http://localhost:3000/signin
    sample payload :    {
                            "username": "user2",
                            "password": "Welcome1"
                        }

3. Add course (only Admin users can add a new course) - http://localhost:3000/course
    sample payload :    {
                            "title" : "Machine Learning",
                            "description" : "Maching Learning and deep learning",
                            "price" : 499,
                            "isPublished" : true
                        }

4. Purchase a course (only authorized user can purchase the course) - http://localhost:3000/course/:courseId

5. Get user purchased courses - http://localhost:3000/user/mycourses/

6. Get all courses - http://localhost:3000/course/home

7. Logout - http://localhost:3000/signout