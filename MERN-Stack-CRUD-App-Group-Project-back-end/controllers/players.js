const Player = require('../models/player');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const createPlayer = await Player.create(req.body);
        res.status(201).json(createPlayer);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const foundPlayers = await Player.find({}).populate('team');
        res.json(foundPlayers);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


router.get('/:playerId', async (req, res) => {
    try {
        const foundPlayer = await Player.findById(req.params.playerId).populate('team');
        if (!foundPlayer) {
            return res.status(404).json({ err: 'Player not found' });
        }
        res.status(200).json(foundPlayer);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});


router.delete('/:playerId', async (req, res) => {
    try {
        const deletedPlayer = await Player.findByIdAndDelete(req.params.playerId)
        if (!deletedPlayer) {
            return res.status(404).json({ err: 'Player not found' });
        }
        res.status(200).json({ message: 'Player deleted successfully' });
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});


router.put('/:playerId', async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.playerId, req.body, { new: true });
        if (!updatedPlayer) {
            res.status(404).json({ err: 'Player not found' });
        }
        res.status(200).json(updatedPlayer);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

module.exports = router;