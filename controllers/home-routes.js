// Contains all of the user-facing routes, such as homepage and login routes. 

const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // Our login page doesn't need any variables, so we don't need to pass a second arguement to the render() method.
    res.render('login');
});

router.get('/', (req, res) => {
    // this route now has access to our user's session
    console.log(req.session);

    if(!req.session.loggedIn) {
        res.redirect('/login')
    }

    //pass a single post object into the homepage template
    res.render('homepage');

});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;