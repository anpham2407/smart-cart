import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import filesRouter from './routes/file';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/v1/static', express.static(process.env.STORAGE_PATH));

app.use('/', indexRouter);
app.use('/v1/auth', authRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/files', filesRouter);

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
