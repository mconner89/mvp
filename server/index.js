require('dotenv').config();
const express = require('express');
const path = require('path');
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const { getPuuid } = require('./search');
const { savePlayer } = require('./database/databaseIndex');

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
  getPuuid(req.body.username)
    .then((outcome) => {
      const puuid = outcome.data.puuid;
      console.log(outcome.data);
      savePlayer(outcome.data);
    })
    .then(() => {
      res.status(201).send('Success');
    });
})