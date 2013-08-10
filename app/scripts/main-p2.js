require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap',
        scrollTo: '../bower_components/jquery.scrollTo/jquery.scrollTo'
    },
    shim: {
        scrollTo: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        underscore:{
            exports: '_'
        }
    }
});

require(['p2', 'jquery', 'underscore', 'bootstrap'], function (App, $, _, bootstrap) {
    'use strict';

    console.log('Running jQuery %s', $().jquery);
    console.log('Running underscore %s', _.VERSION);

    var app = new App();
});
