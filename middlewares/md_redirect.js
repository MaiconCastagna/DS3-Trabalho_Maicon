
module.exports = async function (req, res, next) {

    console.log('md_redirect', req.session.loggedIn);

    if (req.session.loggedIn) {
        return next();
    }
    res.redirect('/auth/maker_signin');

};
