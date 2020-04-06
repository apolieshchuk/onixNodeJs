"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const events = require("./events.ts");
const server_ts_1 = require("./server.ts");
const port = server_ts_1.default.get('port');
events.bind(http.createServer(server_ts_1.default).listen(port), port);
