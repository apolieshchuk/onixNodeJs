import * as http from 'http';
import * as net from 'net';

/**
 * @function
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throw error
 */
export function onError(error: NodeJS.ErrnoException, port: number|string|boolean): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bindPort: number|string|boolean = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bindPort} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bindPort} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * @function
 * @inner
 * @description log port to console
 */
export function onListening(): void {
  console.log(this.server);
  const addr: string | net.AddressInfo = this.address();
  const bindPort: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  console.log(`Listening on ${bindPort}`);
}

/**
 * @function
 * @inner
 * @param {http.Server} Server
 * @param {number} port
 */
export function bind(Server: http.Server, port: number|string|boolean): void {
  this.server = Server;
  Server.on('error', (error: NodeJS.ErrnoException) => this.onError(error, port));
  Server.on('listening', this.onListening.bind(Server));
}
