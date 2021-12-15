const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// POST api/auth/signup
router.post("/signup", (req, res, next) => {
    const { email, name, password } = req.body;

    if (!password || password.length < 8) {
        return res
            .status(400)
            .json({ message: "Your password must be 8 char. min." });
    }
    if (!name) {
        return res.status(400).json({ message: "Your name cannot be empty" });
    }

    if (!email) {
        return res.status(400).json({ message: "Your email cannot be empty" });
    }

    User.findOne({ email: email })
        .then(userFromDB => {

            if (userFromDB !== null) {

                res.status(400).json({ message: 'Email is already taken' });
            } else {


                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(password, salt);


                User.create({ email: email, name: name, password: hash })
                    .then(createdUser => {

                        req.session.user = createdUser
                        res.status(201).json(createdUser)
                    })
                    .catch(err => {
                        next(err);
                    })
            }
            
        }).catch(err => console.log(err))

});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then(userFromDB => {
            if (userFromDB === null) {

                res.status(400).json({ message: 'incorrect credentials' })
            }

            if (bcrypt.compareSync(password, userFromDB.password)) {

                req.session.user = userFromDB;
                res.status(201).json(userFromDB);
            } else {

                res.status(400).json({ message: 'incorrect credentials' })
            }
        })
});

router.get('/loggedin', (req, res, next) => {
    console.log('this is the loggedin user from the session', req.session.user)
    const user = req.session.user
    res.json(user)
})

router.delete('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).json({ message: 'success' })
})

module.exports = router;