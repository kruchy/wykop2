(function (auth) {

    var passport = require('passport');
    var BasicStrategy = require('passport-http').BasicStrategy;

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new BasicStrategy(
        function (username, password, callback) {
            Users.findOne({login: username})
                .exec(function (err, user) {
                    if (err) {
                        return callback(err);
                    }
                    if (!user) {
                        return callback(null, false);
                    }

                    user.verifyPassword(password, function (err, ismatch) {
                        if (err) {
                            return callback(err);
                        }
                        if (!ismatch) {
                            return callback(null, false);
                        }

                        return callback(null, user);
                    });
                });
        }
    ));
    auth.login = function (req, res, next) {

        passport.authenticate('basic', function (err, user, info) {
            if (err) {
                res.send(500);
                return;
            }
            if (!user) {
                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="E-Student API"');
                res.end('Unauthorized');
                return;
            }

            req.session.authenticated = true;
            delete user.password;
            res.json(user);
        })(req, res, next);
    };

    auth.logout = function (req, res) {
        req.session.authenticated = false;
        res.send(200);
    };

})(module.exports);