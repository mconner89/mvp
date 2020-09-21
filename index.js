require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = process.env;

app.listen(PORT, () => console.info(`App listening on http://localhost:${PORT}`));

app.get('/', (req, res) => res.send('Hooray!'));