const express = require('express');
const app = express();

const fs = require('fs');
const jsonfile = require('jsonfile');
const path = require('path');

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/api/:category', (req, res) => {
  const fileName = `./results/${req.params.category}.json`;

  fs.exists(fileName, (exists) => {
    if (!exists) {
      res.status(404);
      res.send(`Uh oh, we don't have that category! (▰︶︹︺▰)`);
    } else {
      fs.readFile(fileName, 'utf8', (err, data) => {
        const json = JSON.parse(data);

        res.status(200);
        res.send(chooseEmoji(json));
      });
    }
  });
});

function chooseEmoji (data) {
  return data[Math.floor(Math.random()*data.length)];
}

app.listen(process.env.PORT || 3000);
