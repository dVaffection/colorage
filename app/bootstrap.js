module.exports = function(config) {
    var serviceLocator = require('service-locator').createServiceLocator();

    bootstrap(config, serviceLocator);

    return serviceLocator;
};

function bootstrap(config, serviceLocator) {
    if (!config.timezone) {
        throw new Error('Timezone was not set in the provided configuration');
    }
    process.env.TZ = config.timezone;

    (function(config) {
        var mongoose = require('mongoose');
        mongoose.connect(config.connectionString);
        mongoose.set('debug', config.debug);
        mongoose.connection.on('error', function(error) {
            console.log('Mongoose connection error:', error);
        });

        serviceLocator.register('mongoose', mongoose);
    })(config.mongo);


    var mapperModelsProxy = require('./mappers/modelsProxy');
    serviceLocator.register('modelsProxy', new mapperModelsProxy(
        serviceLocator.mongoose));


    (function() {
        var cache;
        serviceLocator.register('foodstuffMapper', function() {
            if (typeof cache === 'undefined') {
                var mapper = require('./mappers/foodstuff');
                cache = new mapper(serviceLocator);
            }
            return cache;
        });
    })();


    (function() {
        var cache;
        serviceLocator.register('rationMapper', function() {
            if (typeof cache === 'undefined') {
                var mapper = require('./mappers/ration');
                cache = new mapper(serviceLocator);
            }
            return cache;
        });
    })();
}