const express = require('express');
const router = express.Router();
const User = require('../models/models').User;

router.get('/', async function (req, res, next) {
    const users = await User.getUsers().catch(function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({success: false, error: "Problem getting users from server", reason: err});
        }
    });
    if (users) res.status(200).json({success: true, users: users});

});


module.exports = router;
