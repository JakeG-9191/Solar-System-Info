const express = require('express');
const users = require('./routes/users');
const app = express();

app.use('/api/users', users);

app.use(express.json());
app.use(express.urlencoded({ extended: true, useNewUrlParser: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
