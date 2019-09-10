'use strict';

const Hapi = require('hapi');
const Vision = require('vision');
const hbs = require('hbs');
const Inert = require('inert');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {
    await server.register(Inert);
    await server.register(Vision);

    server.views({
        engines: {
            html: hbs
        },
        relativeTo: __dirname,
        path: 'templates'
    });

    server.route(require('./routes/route'));

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();