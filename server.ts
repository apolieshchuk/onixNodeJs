import * as http from 'http';
import * as httpProxy from 'http-proxy';
import * as url from 'url';
import * as zlib from 'zlib';
import { Readable } from 'stream';

// proxy server
const proxy: httpProxy = httpProxy.createProxyServer({});

// Main server
const server: http.Server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    // query string with host
    const parsedUrl: url.UrlWithParsedQuery = url.parse(req.url, true);
    const host: string = String(parsedUrl.query.host);

    // start proxy web + options
    proxy.web(req, res, {
      target: host === 'undefined' ? 'https://github.com' : host, // default host
      changeOrigin: true,
      selfHandleResponse: true,
      followRedirects: true,
    });
  },
);

// events listeners: on any Proxy Response
proxy.on('proxyRes', (
  proxyRes: http.IncomingMessage,
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  // get data(body) from response by chunks
  const data: any[] = [];
  proxyRes.on('data', (chunk: any) => {
    data.push(chunk);
  });

  // On the end of response, modify it
  proxyRes.on('end', () => {
    // get body from data as buffer
    const body: Buffer = Buffer.concat(data);

    // get zip type from response
    const zipType: string = proxyRes.headers['content-encoding'];
    console.log(`Zip type from response: ${zipType}`);

    // Check zip encoding
    if (zipType !== 'gzip') {
      res.end('Site encoding not supporting');
    }

    // unzip response
    zlib.gunzip(body, (err: Error, buffer: Buffer) => {
      if (err) {
        res.end('error in unzip (gzip)');
      }

      // get html
      let html: string = buffer.toString();

      // insert my text
      html += `<h1 style="color: red; position: absolute;
                    top: 20px; left: 50%; z-index: 9999;"> Hello world </h1>`;

      // change length
      // eslint-disable-next-line no-param-reassign
      proxyRes.headers['content-length'] = String(html.length);

      // compress and finish response
      const outStream: Readable = Readable.from(html);
      res.writeHead(200, { 'content-encoding': 'gzip' });
      outStream.pipe(zlib.createGzip()).pipe(res);
    });
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
