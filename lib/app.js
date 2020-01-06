const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/studios', require('./routes/studios'));
app.use('/api/v1/actors', require('./routes/actors'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
