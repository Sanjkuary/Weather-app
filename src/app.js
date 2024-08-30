const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 8000;

// Set the static path for serving static files
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");

const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));

// Set the view engine to handlebars
app.set('view engine', 'hbs');
app.set('views', templates_path);
hbs.registerPartials(partials_path);

// Routes
app.get("/", (req, res) => {
    res.render('index');  // Renders index.hbs
});

app.get("/about", (req, res) => {
    res.render('about');  // Renders about.hbs
});

app.get("/weather", (req, res) => {
    res.render('weather');  // Renders weather.hbs
});

app.get("*", (req, res) => {
    res.render('404error', {
        errorMsg:'Opps! Page Not Found!'
    });  // Renders 404.hbs with an error message
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
