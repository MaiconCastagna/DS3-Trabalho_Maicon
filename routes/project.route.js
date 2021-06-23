const express = require('express');
const router = express.Router();
const _ = require('lodash');
const md_redirect = require('../middlewares/md_redirect');

//----------------------------------------------------------------------

const { Project } = require('../models');
const { Maker } = require('../models');

//---------------------------------------------------------------------
// Rotas

router.get('/meus_p', async (req, res) => {
    const idMaker = req.session.makerId;
    const project = await Project.findAll({
        where: {
            authorId: idMaker
        }
    });
    console.log(req.session.makerId);
    return res.render('meus_projetos', { project });
});

router.get('/cad_p', md_redirect, async (req, res) => {
    const idMaker = req.session.makerId;
    return res.render('project_cad', { idMaker });
});

router.get('/', async (req, res) => {
    const project = await Project.findAll();
    return res.send(project);
});

router.post('/', async (req, res) => {
    let project = await Project.create(req.body);
    return res.render('maker');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const project = await Project.findByPk(id);

    if (!project) {
        return res.status(404).send('Projeto não encontrado!');
    }

    await project.destroy();
    res.send('Projeto excluído!');
});

//---------------------------------------------------------------------

module.exports = router;
