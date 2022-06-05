"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const url = __importStar(require("url"));
const fs = __importStar(require("fs"));
const queryString = __importStar(require("query-string"));
const hostname = '127.0.0.1';
const port = 3000;
const server = (0, http_1.createServer)((req, res) => {
    var _a, _b;
    let resposta = '';
    const urlParse = url.parse((_a = req.url) !== null && _a !== void 0 ? _a : '', true);
    const pathName = urlParse.pathname;
    const params = queryString.parse((_b = urlParse.search) !== null && _b !== void 0 ? _b : '');
    if (pathName == '/criar-atualizar-usuario') {
        fs.writeFile(`users/${params.id}.txt`, JSON.stringify(params), function (err) {
            if (err)
                throw err;
            resposta = 'Usuario criado/atualizado com sucesso!';
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta);
        });
    }
    else if (pathName == '/selecionar-usuario') {
        fs.readFile(`users/${params.id}.txt`, function (err, data) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
        });
    }
    else if (pathName == '/remover-usuario') {
        fs.unlink(`users/${params.id}.txt`, function (err) {
            resposta = err ? 'Usuario nao encontrado' : 'Usuario removido com sucesso!';
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta);
        });
    }
    else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Pagina nao encontrada!');
    }
});
server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
