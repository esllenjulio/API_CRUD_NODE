
"use strict";

module.exports = () => {


    const express = require('express');
    const bodyParser = require('body-parser');
    const path = require('path');
    const http = require('http');

    const app = express();

    const port = process.env.NODE_ENV === 'production' ? 80 : 3000;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function (req, res, next){

        res.setHeader('Access-Control-Allow-Origin', '*');

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept, Authorization');

        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    });

    const server = http.createServer(app);
    const routes = require('../app/routes/web');

    routes(app);

    server.listen(port, ()=>{
        console.log('Servidor ligado na porta:'+ port);
    });

}