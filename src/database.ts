import mongoose, { ConnectionOptions } from 'mongoose'
import config from './config/config'

const { URI, USER, PASS, HOST, PORT, NAME } = config.MongoDB;
const MongoURI = `${URI}://${USER}:${PASS}@${HOST}:${PORT}/${NAME}`;

const connectionOptions: ConnectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(MongoURI, connectionOptions);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongodb connection stablished');
});

connection.on('error', error => {
  console.log(error);
  process.exit(0);
});
