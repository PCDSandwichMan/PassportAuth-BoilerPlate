const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cores = require('cors');
const config = require('./util/config');
const passport = require('passport');

const app = express();

// - express setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// - Database connection
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// - Passport Auth Config Import
require('./util/passport')(passport);

// - Route Imports

const database = mongoose.connection;

database.on('error', err => {
  console.log(err);
});

database.once('open', () => {
  // - Route Assignment

  
  //- Fallback Route 404
  app.use((req, res, next) => {
    if (req.accepts('json')) {
      res.status(404).send({ error404: 'This is not a valid call to the api' });
    }
    next();
  });

  // - Server Connection =
  app.listen(config.PORT, () => {
    console.log(`Server is listening on PORT: ${config.PORT}`);
  });
});
