'use strict';

// Import dependencies
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

// Environment variables
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

// App setup
const app = express();
app.get('/', (req, res) => {
  res.send('Hello FS2025 DevOps Course! Es ist Dienstagnachmittag :-) Cloud Deploy auf Render.com - 2nd attempt');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
