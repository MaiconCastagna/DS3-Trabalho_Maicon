const express = require('express');
const router = express.Router();
const _ = require('lodash');

//----------------------------------------------------------------------

const { Maker } = require('../models');

const md_redirect = require('../middlewares/md_redirect');

//----------------------------------------------------------------------
// Rotas personalizadas

router.get('/mkhome', async (req, res) => {
    const makers = await Maker.findAll();
    res.render('home_makers', { makers });
    req.session.loggedIn = true;
});

router.get('/maker', async (req, res) => {
    let maker = await Maker.create(req.body);
    return res.send(maker);
});

router.get('/maker_signup', async (req, res) => {
    const makers = await Maker.findAll();
    res.render('maker_signup', { makers })
});

router.get('/maker_signin', md_redirect, async (req, res) => {
    const makers = await Maker.findAll();
    res.render('maker_signin', { makers })
});

router.get('/:id/vis', md_redirect, async (req, res) => {
    const nid = req.params.id;
    const maker = await Maker.findOne({
        where: {
            id: nid
        }
    });
    res.render('maker_visualizar', { maker })
});

//-----------------------------------------------------------
// Rotas CRUD normais

router.post('/', async (req, res) => {
    let maker = await Maker.create(req.body);
    return res.send(maker);
});

router.get('/', async (req, res) => {
    const makers = await Maker.findAll();
    return res.send(makers);
});

router.get('/:makerId', async (req, res) => {
    const id = req.params.makerId;
    const maker = await Maker.findByPk(id);
    if (!maker) {
        return res.status(404).send('Maker não encontrado!');
    }
    return res.render('maker', { maker });
});

router.get('/:makerId/edit', async (req, res) => {
    const id = req.params.makerId;
    const maker = await Maker.findByPk(id);

    if (!maker) {
        return res.status(404).send('Maker não encontrado');
    }
    return res.render('maker_edit', { maker });
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;

    const maker = await Maker.findByPk(id);

    if (!maker) {
        return res.status(404).send('Usuário não encontrado');
    }
    _.assign(maker, req.body);

    await maker.save();
    res.redirect('/makers');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const maker = await Maker.findByPk(id);

    if (!maker) {
        return res.status(404).send('Usuário não encontrado');
    }

    await maker.destroy();
    res.send('Usuário excluído');
});

//---------------------------------------------------------------------

module.exports = router;
