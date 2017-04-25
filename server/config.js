const config = {};

config.mongoURI = {
    development: 'mongodb://localhost:27017/wykop2',
    test: 'mongodb://localhost:27017/wykop2test'
};
config.secret  = 'supersecret';
module.exports = config;