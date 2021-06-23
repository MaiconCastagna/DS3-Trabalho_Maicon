const express = require('express');
const router = express.Router();
const _ = require('lodash');

//----------------------------------------------------------------------

const { Project } = require('../models');

//---------------------------------------------------------------------
// Rotas

router.get('/', async (req, res) => {
    const project = await Project.findAll();
    return res.send(project);
});

router.post('/', async (req, res) => {
    let project = await Project.create(req.body);
    return res.send(project);
});

//---------------------------------------------------------------------

module.exports = router;
