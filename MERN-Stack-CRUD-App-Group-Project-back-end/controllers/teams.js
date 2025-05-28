const Team = require('../models/team');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const createTeam = await Team.create(req.body);
        res.status(201).json(createTeam);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const foundTeams = await Team.find({});
        res.json(foundTeams);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


router.get('/:teamId', async (req, res) => {
    try {
        const foundTeam = await Team.findById(req.params.teamId);
        if (!foundTeam) {
            return res.status(404).json({ err: 'Team not found' });
            
        }
        res.status(200).json(foundTeam);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        }else {
            res.status(500).json({ err: err.message });
        }
    }
});


router.delete('/:teamId', async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.teamId);
        if (!deletedTeam) {
            return res.status(404);
            throw new Error('Team not found');
        }
        res.status(200).json({ message: 'Team deleted successfully' });
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});


router.put('/:teamId', async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.teamId, req.body, { new: true });
        if (!updatedTeam) {
            return res.status(404).json({ err: 'Team not found' });
        }
        res.status(200).json(updatedTeam);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

module.exports = router;