'use strict';

const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const handlebars = require('handlebars');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});


const init = async () => {
    await server.register(Inert);
    await server.register(Vision);
    
    server.views({
        engines: {
            hbs: handlebars
        },
        relativeTo: __dirname,
        path: 'templates'
    });
    
    server.route(require('./routes/route'));
    
    handlebars.registerHelper('getThis', (that) => JSON.stringify(that.data));

    handlebars.registerHelper('getTotal', (context) => {
        let total = 0;
        context.data.root.selectedProds.forEach((obj) => {
            total += (obj.qty * obj.price);
        });
        return total;
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();