const User = require('../src/models/models').User;
const Post = require('../src/models/models').Post;

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
        Post.remove().exec()
    ];

    Promise.all(promises).then(function () {
    });
}

function createPostForUser(user) {
    let post = new Post(
        {
            author: user._id,
            content: 'Test'
        }
    );
    post.save(function (err) {
        if (err) {
            throw err;
        }
        else {
            post.populate('author', function (err, populatedPost) {
                if (err)
                    throw err;
            });
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

module.exports.clearDatabase = clearDatabase;
module.exports.createAdmin = createAdmin;
module.exports.createAndSaveUser = createAndSaveUser;
module.exports.createPostForUser = createPostForUser;
