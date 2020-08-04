const User = require('../models/User')
const University = require('../models/University')
const { createToken, createTokenU } = require('../config/jwt')

exports.signup = (req, res, next) => {
    User.register({...req.body }, req.body.password)
        .then(user => {
            if (user.role === 'UNIVERSITY') {
                University.create({ userId: user._id })
                    .then(university => res.status(201).json({ user, university }))
                    .catch(err => res.status(500).json({ err }))
            } else {
                res.status(201).json({ user })
            }
        })
        .catch(err => res.status(500).json({ err }))
}

exports.login = (req, res, next) => {
    const { user } = req
    const [header, payload, signature] = createToken(user)
    res.cookie('headload', `${header}.${payload}.`, {
        //maxAge: 1000 * 60 * 30,
        //secure: true
    })
    res.cookie('signature', signature, {
        //httpOnly: true,
        //secure: true
    })
    res.status(200).json({ user })
}

exports.oneUser = (req, res, next) => {
    const { id } = req.params
    User.findById(id).populate('follow').populate('followers')
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ err }))
}


exports.logout = (req, res, next) => {
    res.clearCookie('headload')
    res.clearCookie('signature')
    res.status(200).json({ msg: 'Logged out' })
}

exports.follow = (req, res, next) => {

    const { id2 } = req.body
    const { id } = req.params

    User.findByIdAndUpdate(id, { $push: { follow: id2 } })
        .then(user => {
            User.findByIdAndUpdate(id2, { $push: { followers: id } }, { new: true })
                .then(user2 => res.status(201).json({ user, user2, msg: 'Ahora sigues a este usuario' }))
                .catch(err => res.status(500).json({ err }))
        })
        .catch(err => res.status(500).json({ err }))

}

exports.universities = (req, res, next) => {
    User.find({ role: 'UNIVERSITY' })
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ err }))
}