const User = require('../src/models/models').User;
const Post = require('../src/models/models').Post;
const Comment = require('../src/models/models').Comment;

function createAndSaveUser() {
    let user = new User(
        {
            username: 'Bruce',
            email: 'brucewayne@test.com',
            password: 'test'
        }
    );
    user.save(function (err) {
        if (err) {
            {
                throw err;
            }
        }
    });
    return user;
}

function clearDatabase() {
    let promises = [
        User.remove().exec(),
        Post.remove().exec(),
        Comment.remove().exec()
    ];

    Promise.all(promises).then(function () {
    });
}

function createPostForUser(user,comments) {
    let post = new Post(
        {
            author: user,
            content: 'Test',
            title: 'Title',
            comments:comments
        }
    );
    post.save(function (err) {
        if (err) {
            throw err;
        }
        else {

        }
    });
    return post;
}



function createAdmin(enabled) {

    let user = new User(
        {
            username: 'admin',
            email: 'admin@test.com',
            password: 'admin',
            admin: enabled
        }
    );
    user.save(function (err) {
        if (err) {
            {
                throw err;
            }
        }
    });
    return user;
}

function createCommentForUser(user,replies)
{
    let comment = new Comment(
        {
            content : 'Content',
            author : user,
            replies:replies
        }
    );
    comment.save(function (err) {
        if(err)
        {
            throw err;
        }
    });
    return comment;
}



module.exports.clearDatabase = clearDatabase;
module.exports.createAdmin = createAdmin;
module.exports.createAndSaveUser = createAndSaveUser;
module.exports.createPostForUser = createPostForUser;
module.exports.createCommentForUser= createCommentForUser;