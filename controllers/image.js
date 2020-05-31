const handler=(req, res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries')
        .returning('entries')
        .then(entries => console.log(entries))
};
module.exports = {
    imageHandler: handler
};