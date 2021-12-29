const express = require('express');
const html = require('./routes/html');
const api = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware - parse json data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', api)
app.use('/', html)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);