module.exports = function (config) {
    config.set({

        basePath: '../',
        reporters: ['progress', 'junit'],
        files: [
	    'penelope/frontend/static/js/**/*.js',
	    'test/unit/**/*.js'
	],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome', 'Firefox'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

        junitReporter: {
	    outputDir: 'reports'
            outputFile: 'reports/unit.xml',
            suite: 'unit'
        }

    });
};
