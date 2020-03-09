const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const posts = require('./routes/posts');
const config = require('config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, useNewUrlParser: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.use('/api/users', users);
app.use('/api/posts', posts);

const db = config.get('db');

mongoose.connect(db).then(() => console.log(`Connected to ${db}`));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
