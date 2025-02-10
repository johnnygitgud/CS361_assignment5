var express = require('express');
var app = express();
PORT = 9014;
const session = require('express-session');
const { engine } = require('express-handlebars');
const helmet = require('helmet');

app.engine('.hbs', engine({ extname: ".hbs", defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Use Helmet to set CSP
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "http://localhost:9014"]
        }
    }
}));

// Root route
app.get('/', function(req, res) {
    res.redirect('/login');
});

// Registration route
app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {
    // Allow any registration without saving
    res.redirect('/login');
});

// Login route
app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    // Allow any login without checking credentials
    req.session.user = { email: req.body.email, dateJoined: new Date() };
    res.redirect('/home');
});

// Logout route
app.post('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});

// Home route
app.get('/home', function(req, res) {
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
});