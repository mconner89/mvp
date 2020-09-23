const mongoose = require('mongoose');
const { getMatchData } = require('../search');

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

const gamesSchema = new mongoose.Schema({
  game: String
})

const Games = mongoose.model('Games', gamesSchema);

const playerGamesSchema = new mongoose.Schema({
  game: {type: mongoose.Schema.Types.ObjectId, ref: 'Games'},
  player: {type: mongoose.Schema.Types.ObjectId, ref: 'Players'},
  playerGame: {type: String},
  gold_left: Number,
  last_round: Number,
  level: Number,
  placement: Number,
  total_damage_to_players: Number,
})

const PlayerGames = mongoose.model('PlayerGames', playerGamesSchema);

const savePlayer = async(data) => {
  const exists = await Players.exists({ puuid: data.puuid });
  const player = {
    inGameName: data.gameName,
    puuid: data.puuid,
    tagLine: data.tagLine,
  };

  if (!exists) {
    return Players.insertMany(player);
  } else {
    return Players.updateOne({ puuid: data.puuid }, player)
      .then(() => Players.find({}).exec())
      .then(data => data[0]);
  }
};

const saveGames = async (data, id) => {
  const arr = [];
  const gameIds = [];
  for (let i = 0; i < data.length; i++) {
    const exists = await Games.exists({ game: data[i] });
    if (!exists) {
      arr.push({game: data[i]});
    }
  }
  await Games.insertMany(arr);
  // const data_1 = await Games.find({}).exec();
  for (let i = 0; i < data.length; i++) {
    const temp = await Games.findOne({ game: data[i] }).exec();
    gameIds.push(temp._id);
  }
  return gameIds;
};

const updatePlayerGames = async (gameIds, playerId) => {
  for (let i = 0; i < gameIds.length; i++) {
    const exists = await PlayerGames.exists({playerGame: `${gameIds[i]}${playerId}`});
    if (!exists) {
      const temp = await Games.findOne({_id: gameIds[i]}).exec();
      const tempPlayerId = await Players.findOne({_id: playerId}).exec();
      const temp2 = await getMatchData(temp.game);
      let gold_left, last_round, level, placement, total_damage_to_players;
      temp2.data.info.participants.forEach(participant => {
        if (participant.puuid === tempPlayerId.puuid) {
          gold_left = participant.gold_left;
          last_round = participant.last_round;
          level = participant.level;
          placement = participant.placement;
          total_damage_to_players = participant.total_damage_to_players;
        }
      })
      await PlayerGames.create({
        game: gameIds[i],
        player: playerId,
        playerGame: `${gameIds[i]}${playerId}`,
        gold_left: gold_left,
        last_round: last_round,
        level: level,
        placement: placement,
        total_damage_to_players: total_damage_to_players,
      });
    }
  }
  return PlayerGames.find({}).exec().then(data => data);
}

const deleteGame = async (gameId) => {
  await Games.deleteOne({_id: gameId});
  await PlayerGames.deleteMany({game: gameId});
  return PlayerGames.find({}).exec().then(data => data)
}

module.exports.savePlayer = savePlayer;
module.exports.saveGames = saveGames;
module.exports.updatePlayerGames = updatePlayerGames;
module.exports.deleteGame = deleteGame;