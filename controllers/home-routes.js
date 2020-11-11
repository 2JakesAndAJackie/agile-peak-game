// All User-Facing routes, such as homepage and Login Routes

const router = require('express').Router();
const sequelize = require('../config/connection');
// const {User} = require('../models');

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


module.exports = router;