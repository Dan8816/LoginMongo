//this is the controller for all things dogs, if another model class was needed using another controller would help keep things readable
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = {
    index: (req, res) => {
        console.log("**********hitting the index method**********")
        res.render("index");
    },
    dashboard: (req, res) => {
        console.log("**********hitting the dashboard**********");
        if(req.session.user == ""){
            consoler.log("**********user not in session**********");
            return res.redirect('/');
        }else{
            thisUser = req.session.user;
            res.render("dashboard");
        }
    },
    register: (req, res) => {
        console.log("*********Hitting the register method**********")
        if (req.body.password !== req.body.passwordConf){
            console.log("**********Password mismatch**********");
            return res.render("/");
        }
        if (req.body.first_name &&
            req.body.last_name &&
            req.body.birthday &&
            req.body.email &&
            req.body.password != "")
            {
                var userData = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    birthday: req.body.birthday,
                    email: req.body.email,
                    password: req.body.password
                }
                User.create(userData, function (err, user){
                    if (err) {
                        console.log("**********The error is " + err + "**********");
                        return (err);
                    } else {
                        console.log("**********Successful user creation**********")
                        req.session.user = user;
                        console.log(req.session.user);
                        return res.redirect('/dashboard');
                    }
                });
            }
        else{
            console.log("**********Body data missing**********");
            return res.redirect('/');
        }
    },
    login: (req, res) => {
        console.log("**********hitting the login route**********");
        if(req.body.email && req.body.password != ""){
            User.findOne({email: req.body.email}, function(err, user){
                if (err){
                    consoler.log("**********The error is " + err + "**********");
                    return res.redirect("/");
                }else{
                    user.comparePassword(req.body.password, function(err, isMatch){
                        if (err){
                            console.log("**********The error is " + err + "**********");
                            return res.redirect("/");
                        }else{
                            console.log("**********Credentials are successful**********");
                            req.session.user = user;
                            res.redirect("dashboard");
                        }
                    })
                }
                
            });
        }
    }        
}