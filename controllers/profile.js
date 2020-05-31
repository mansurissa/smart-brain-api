const handle = (req, res, db) => {
    const { id } = req.params;

    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length) {
            res.json(user)
        } else {
            res.status(400).json('not found')
        }
    })

}
module.exports = {
    profileHandler: handle
}