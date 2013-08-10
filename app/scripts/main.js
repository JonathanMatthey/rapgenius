require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        scrollTo: '../bower_components/jquery.scrollTo/jquery.scrollTo'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require([ 'app', 'jquery', 'bootstrap', 'scrollTo', 'hello'], function (app, $) {
    'use strict';
    // use app here

    console.log('Running jQuery %s', $().jquery);
});
