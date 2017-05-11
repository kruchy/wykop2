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

function createUserWithPost(done) {
    let user = new User(
        {
            username: "Bruce",
            email: "brucewayne@test.com",
            password: 'test',
            admin: false
        }
    );
    user.save(function (err) {
        if (err)
            throw err;
        new Post(
            {
                author: user._id,
                content: 'Test'
            }
        ).save(function (err) {
            if (err)
                throw err;
            done();
        })
    });
}

function createAdmin(enabled) {

    let user = new User(
        {
            username: 'admin',
            email: 'admin@test.com',
            password: 'admin',
            admin:enabled
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
module.exports.createUserWithPost = createUserWithPost;
