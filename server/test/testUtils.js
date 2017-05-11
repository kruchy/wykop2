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
module.exports.clearDatabase = clearDatabase;
module.exports.createAndSaveUser = createAndSaveUser;
