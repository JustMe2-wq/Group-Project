const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,

    position: String,

    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;