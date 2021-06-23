module.exports = async function (req, res, next) {

    console.log('Verificando a privacidade dos projetos!');

    

    if (req.session.loggedIn) {
        return next();
    }
    res.redirect('/auth/maker_signin');

};
