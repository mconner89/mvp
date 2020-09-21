const mongoose = require('mongoose');

const DATABASE = 'mvp';
const DB_URI = `mongodb://localhost/${DATABASE}`;

mongoose.connect(DB_URI, {useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('failed to connect to database', err));

const playerSchema = new mongoose.Schema({
  riotName: String,
  inGameName: String,
  puuid: String,
  tagLine: String,
});

const Players = mongoose.model('Players', playerSchema);

const savePlayer = async(data) => {
  const exists = (await Players.findOne({ puuid: data.puuid }).exec()) || false;
  // This function should save a repo to the MongoDB
  const player = {
    inGameName: data.gameName,
    puuid: data.puuid,
    tagLine: data.tagLine,
  };

  if (!exists) return Players.insertMany(player);
  return Players.updateOne({ puuid: data.puuid }, player);
};

module.exports.savePlayer = savePlayer;