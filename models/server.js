const express = require('express');
const cors = require('cors');
const { usersRouter } = require('../routes/users.routes');
const { repairsRouter } = require('../routes/repairs.routes');
const morgan = require('morgan');
const { db } = require('../dababase/db');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controler');
const initModel = require('./init.model');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.paths = {
      users: '/api/v1/users',
      repairs: '/api/v1/repairs',
    };
    // es para llamar el metodo de conexion con la base de datos
    this.database();
    this.middlewares();
    this.Route();
  }
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      console.log('HOLA ESTOY EN DESARROLLO');
    }
    if (process.env.NODE_ENV === 'production') {
      console.log('HOLA ESTOY EN PRODUCCIÓN');
    }

    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
  }

  Route() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.repairs, repairsRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server`, 404)
      );
    });
    this.app.use(globalErrorHandler);
  }
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    // relations
    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server us running on port`, this.port);
    });
  }
}

module.exports = Server;
