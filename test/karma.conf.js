module.exports = function (config) {
    var baseDir = 'penelope/frontend/static/';
    config.set({
        basePath: '../',
              
        preprocessors: {
            'penelope/frontend/static/js/*.js': ['jshint'],
            'penelope/frontend/static/partials/templates/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
          stripPrefix: "penelope/frontend",
          moduleName: "templates",  
        },
        reporters: ['progress'],
        files: [
            baseDir + 'bower_components/jquery/dist/jquery.js',
            baseDir + 'bower_components/angular/angular.js',
            baseDir + 'bower_components/angular-route/angular-route.js',
            baseDir + 'bower_components/angular-resource/angular-resource.js',
            baseDir + 'bower_components/selection-model/dist/selection-model.js',
            baseDir + 'bower_components/angular-mocks/angular-mocks.js',
            baseDir + 'js/**/*.js',
            baseDir + 'partials/*.html',
            baseDir + 'partials/**/*.html',
            'test/unit/**/*.js'
	       ],
        
        
        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-jshint-preprocessor',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            ],
  
        jshint: {
            options: {
                globals: {
                    $: false,
                    
                }
            }
        },

    });
};