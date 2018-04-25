const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const http = require("http");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/send', (req, res) => {
  const url = "http://beta.soldai.com/bill-cipher/askquestion?question=" + req.body.q + "&session_id=1&key=da5eb745007afb9a195fe50744483d4cf436b9bf&log=1";
  http.get(url, resp => {
    resp.on("data", data => {
      res.send(data);
    });
  });
  // res.send(
  //   [{
  //     message: "hola",
  //     from: "me"
  //   }, {
  //     message: "mundo",
  //     from: "bot"
  //   }]
  // )
})

app.listen(process.env.PORT || 8081)