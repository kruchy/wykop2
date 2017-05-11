# Wykop2 server


Run tests with npm test
Software needed:

MongoDB Community Server https://www.mongodb.com/download-center?jmp=nav#community

Node.js https://nodejs.org/en/


## Api:


### /

Index

### /user


### /login

    POST(username,password) 
    
Authenticate user, if successful returns json web token needed for other activities


### /posts

    GET()
    
Retrieve all posts 


    POST(content,token) 
Add new post with current user as author

### /register

    POST(username,password,email)
    
register new standard user

### /admin

    POST(username,token)
    
Elevate user to admin