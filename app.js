// Require the Express Module
const express = require('express');
// Require path
const path = require('path');
const session = require('express-session');
// Create an Express App
const app = express();
const PORT = 8000;
// Require body-parser (to receive post data from clients)
const bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
app.set('trust proxy', 1);//trust 1st proxy
app.use(session({
    secret: 'tacocat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000}
}))
require("./server/config/mongoose");
require("./server/config/routes")(app);
// Setting our Server to Listen on Port: 8000
app.listen(PORT, ()=> {
    console.log(`listening on port: ${PORT}`);
})