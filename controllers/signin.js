
const handler = (req, res, db, bcrypt) => {
    db.select('*').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.json('no such user'))

            } else {
                res.json('no non')
            }
        })

}
module.exports = {
    signinHandler: handler
};