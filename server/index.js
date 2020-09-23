require('dotenv').config();
const express = require('express');
const path = require('path');
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const { getPuuid, getMatches } = require('./search');
const { savePlayer, saveGames, updatePlayerGames, deleteGame } = require('./database/databaseIndex');

const { PORT } = process.env;
const bodyParser = require('body-parser');
const app = express();

require('./database/databaseIndex.js');

app.use(express.static(CLIENT_PATH));
app.use(bodyParser.json());

app.listen(PORT, () => console.info(`App listening on http://localhost:${PORT}`));

app.get('/', (req, res) => res.send('Hooray!'));

app.get('/test', (req, res) => res.send('idk man'));

app.post('/', (req, res) => {
  let id;
  getPuuid(req.body.username)
    .then((outcome) => {
      return savePlayer(outcome.data);
    })
    .then(data => {
      id = data._id;
      return getMatches(data.puuid)
    })
    .then(games => {
      return saveGames(games.data, id);
    })
    .then(data => {
      return updatePlayerGames(data, id);
    })
    .then(data => {
      res.status(201).send(data);
    });
})

app.delete('/delete/:id', (req, res) => {
  deleteGame(req.params.id)
    .then(data => {
      res.status(202).send(data);
    });
})

