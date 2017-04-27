const express = require('express');
const router = express.Router();
var User = require("../models/models.js").User;

/* GET home page. */
router.post('/', function (req, res, next) {
    const userName = req.body.username;
    const userEmail = req.body.email;
    const userPasword = req.body.password;

    const user = new User(
        {
            username: userName,
            email: userEmail,
            password: userPasword,
            admin: false

        }
    );
    user.save(function (error) {

        if (error) {

            res.status(500).json({

                error: "There was a problem adding the information to the database.", reason: error
            });
        } else {
            res.status(200).json(user);
        }
    });


});

var algorithm = 'aes-256-ctr';
var privateKey = '37LvDSm4XvjYOh9Y';

function decrypt(password) {
    var decipher = crypto.createDecipher(algorithm, privateKey);
    var dec = decipher.update(password, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

// method to encrypt data(password)
function encrypt(password) {
    var cipher = crypto.createCipher(algorithm, privateKey);
    var crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
module.exports = router;
