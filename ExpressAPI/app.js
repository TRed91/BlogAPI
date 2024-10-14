const express = require('express');
require('dotenv').config();
const passport = require('passport');
const cors = require('cors');
const jwtStrategy = require('./strategy/jwtStrategy.js')
const routes = require('./routes/index');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(jwtStrategy);

app.use('/authors', routes.authorRoute);
app.use('/users', routes.userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));