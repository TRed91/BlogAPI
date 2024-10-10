const express = require('express');
require('dotenv').config();
const routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/author', routes.authorRoute);
app.use('/user', routes.userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));