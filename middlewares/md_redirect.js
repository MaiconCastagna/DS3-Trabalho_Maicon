
module.exports = async function (req, res, next) {

    console.log('md_redirect');

    if (req.session.loggedIn) {
        res.render('maker', { maker });
        return next();
    }
    res.render('maker_signin');

};
