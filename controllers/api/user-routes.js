const router = require('express').Router();
const {User} = require('../../models');


// Get ALL
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        // prevents the server from returning user passwords
        attributes: {exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Login Route /api/users/login
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(dbUserData => {
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that email address!' });
          return;
        }
    
        // Verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(500).json({message: 'Incorrect Password'});
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
        });

        res.json({user: dbUserData, message: 'You are now logged in'});
    
      });  
});

// Lougout Route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
})