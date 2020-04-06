import * as mongoose from 'mongoose';
import { ConnectOptions } from '../interfaces';

class Connection { // TODO extra class, but what i can do if Checha said :)
  private MONGODB_URI: string = 'mongodb://localhost:27017/';

  private MONGODB_DB_MAIN: string = 'books_db';

  private MONGO_URI: string = `${this.MONGODB_URI}${this.MONGODB_DB_MAIN}`;

  private connectOptions: ConnectOptions = {
    // automatically try to reconnect when it loses connection
    autoReconnect: true,
    // reconnect every reconnectInterval milliseconds
    // for reconnectTries times
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    // flag to allow users to fall back to the old
    // parser if they find a bug in the new parse
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  public run(): mongoose.Connection {
    return mongoose.createConnection(this.MONGO_URI, this.connectOptions);
  }
}


export default new Connection().run(); // TODO extra class, but what i can do if Checha said :)
