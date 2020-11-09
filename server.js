const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

// Handlebars.js template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlbars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Middleware function that takes all contents of a folder, serves them as a static asset 
app.use(express.static(path.join(__dirname, 'public')));

// Turns on routes
app.use(routes);


// Connection to db and server
// Force, if set to true, drops and recreates all DB tables on startup
sequelize.sync({force: false}).then( () => {
    app.listen(PORT, () => console.log('Now Listening'));
});