const router = require('express').Router()

const bcryptjs = require('bcryptjs')

const Users = require('./users/users-model.js')
const userModel = require('./users/users-model.js')

router.post('/register', (req, res) => {
    const {username, password} = req.body
    const rounds = process.env.HASH_ROUNDS || 7
    const hash = bcryptjs.hashSync(password, rounds)

    Users.add({ username, password: hash })
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => res.send(err))
})

router.post('/login', (req, res) => {
    const {username, password} = req.body

    Users.findby({username})
    .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
            req.session.user = { id: user.id, username: user.username };
            res.status(200).json({ welcome: "to moria", session: req.session });
        } else {
            res.status(401).json({you: 'CANNOT PASS'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

router.get("/logout", (req, res) => {
    if (req.session) {
      req.session.destroy(error => {
        if (error) {
          res.status(500).json({ message: "Error logging in" });
        } else {
          res.status(204).end();
        }
      });
    } else {
      res.status(204).end();
    }
  });

module.exports = router

