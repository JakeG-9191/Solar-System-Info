const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => `App listening on port ${PORT}...`);

module.exports = server;
