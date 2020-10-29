require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const authRouter = require('./auth/auth-router');
const userRouter = require('./registration/registration-router');
const siteRouter = require('./site/site-router');
const inventoryRouter = require('./inventory/inventory-router');
//const testRouter = require("./site/testRouter");
const app = express();
//const placesRouter = require('./places/places-router')

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.use('/api/sites', siteRouter);
app.use('/api/items', inventoryRouter);
app.use('/api/auth', authRouter);
app.use('/api/registration', userRouter);
//app.use("/api/places", placesRouter)

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
