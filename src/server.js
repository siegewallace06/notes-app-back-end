//  This File Will Contain All Server Configuration

// Import Hapi
const Hapi = require('@hapi/hapi');

// import routes
const routes = require('./routes');

// Set Hapi Server
const init = async () => {
    const server = Hapi.server({
        port: 4000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            // allow cors
            cors: true,

        },
    });

    // Add the routes to the server
    server.route(routes);
    
    // Start the server
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

// Start the server
init();