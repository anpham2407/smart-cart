import mongoose from 'mongoose';

const init = (uri) => {
  // db connection
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('mongo connected');
      process.emit('dbConnected');
    })
    .catch((err) => {
      console.log('mongo connection error');
      throw err;
    });
};

export default { init };
