const express = require('express');
const users = require('./routes/users');
const posts = require('./routes/posts');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, useNewUrlParser: true }));

app.use('/api/users', users);
app.use('/api/posts', posts);

const db = config.get('db');

mongoose.connect(db).then(() => console.log(`Connected to ${db}`));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
