const express = require('express');
const bodyParser = require('body-parser');
const Database = require('./middleware/Database');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// For processing slack requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Database.pool());

// Controllers
const botController = require('./controllers/botController');
const authController = require('./controllers/authController');

// Slack Routes
app.post('/app', botController.index);
app.get('/connect', authController.callback);
app.get('/addtoslack', (req, res) => {
  res.redirect(`https://slack.com/oauth/authorize?scope=commands,bot,chat:write:bot&client_id=${process.env.SLACK_CLIENT_ID}`);
});

// TODO: View engine
// Add to slack button
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

// Success page
app.get('/connected', (req, res) => {
  res.sendFile('connected.html', { root: './public' });
});

module.exports = app;
