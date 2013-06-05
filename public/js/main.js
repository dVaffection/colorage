requirejs.config({
    //By default load any module IDs from js
    baseUrl: 'js',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        bootstrap: "lib/bootstrap-2.3.1.min",
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
            'lib/jquery-1.9.1.min',
        ],
        backbone: "lib/backbone-1.0.0.min",
        iosync: 'lib/backbone.iosync',
        underscore: "lib/underscore.1.4.4.min",
        'jquery.serialize-object': "lib/jquery.serialize-object",
        'jquery.color': 'lib/jquery.color-2.1.2.min',
        async: 'lib/async',
    },
    shim: {
        'jquery.serialize-object': {
            deps: ['jquery']
        },
        'jquery.color': {
            deps: ['jquery']
        },
        'bootstrap' : {
            deps: ['jquery']
        },
    },
});

// Start the main app logic.

require([
    // Load our app module and pass it to our definition function
    'app',
], function(App) {
    // The "app" dependency is passed in as "App"
    App.initialize();
});
