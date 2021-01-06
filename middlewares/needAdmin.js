function needAdmin(req, res, next) {
    if(req.session.user.isAdmin) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = needAdmin