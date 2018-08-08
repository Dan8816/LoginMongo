//this file is for routing the url to the controller an method
const users = require("./../controllers/users");

module.exports = (app) => {
    app.get("/", users.index)//display all users
    app.get("/dashboard", users.dashboard),//display form for new dog   
    app.post("/register", users.register),//action to register
    app.post("/login", users.login)//action to register
}
