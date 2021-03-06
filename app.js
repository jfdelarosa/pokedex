const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const axios = require("axios");

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
})

app.post('/send', (req, res) => {
  const url = "http://beta.soldai.com/bill-cipher/askquestion?question=" + req.body.q + "&session_id=1&key=da5eb745007afb9a195fe50744483d4cf436b9bf&log=1";
  axios.get(url)
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

app.get('/pokeapi/:intent/:pokemon', (req, res) => {
  const url = "https://pokeapi.co/api/v2/pokemon/" + req.params.pokemon.toLowerCase() + "/";
  axios.get(url)
  .then(response => {
    let ret = "";
    const data = response.data;
    switch (req.params.intent) {
      case "abilities":
        for (let i = 0; i < data.abilities.length; i++) {
          ret += data.abilities[i].ability.name + ", ";
        }
      break

      case "stats":
        for (let i = 0; i < data.stats.length; i++) {
          ret += data.stats[i].stat.name + ": " + data.stats[i].base_stat + ", ";
        }
      break;

      case "moves":
        for (let i = 0; i < data.moves.length; i++) {
          ret += data.moves[i].move.name + ", ";
        }
      break;
      
      case "weight":
        ret = data.weight + ", ";
      break;

      case "height":
        ret = data.height + ", ";
      break;

      case "types":
        for (let i = 0; i < data.types.length; i++) {
          ret += data.types[i].type.name + ", ";
        }
      break;
    }
    ret = ret.replace(/,\s*$/, "");
    res.send(JSON.stringify({"data": ret }));
  })
  .catch(error => {
    console.log(error);
  });
});

app.listen(process.env.PORT || 8080);