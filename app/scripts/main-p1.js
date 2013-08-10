require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        scrollTo: '../bower_components/jquery.scrollTo/jquery.scrollTo'
    },
    shim: {
        scrollTo: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery','scrollTo'],
            exports: 'jquery'
        }
    }
});

require([ 'p1', 'jquery', 'bootstrap'], function (app, $) {
    'use strict';
    // use app here

    console.log('Running jQuery %s', $().jquery);
});
