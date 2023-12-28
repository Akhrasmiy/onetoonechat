const express = require('express');
const db = require('./db');
const config = require('./shared/config');
const handleError = require('./shared/errors/handle');
const usersRoute = require('./modules/users/_api');
const chatRoute = require('./modules/chat/_api');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.use(usersRoute);
app.use(chatRoute);

app.use(handleError);

db();
app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti.`);
});
