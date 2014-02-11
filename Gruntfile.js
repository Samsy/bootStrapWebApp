
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // import all vendors here
        concat: {
            options: {
                separator: ';',
            },
            vendor: {
                src: [
                    'bower_components/jquery/jquery.js',
                    'bower_components/createjs-preloadjs/lib/preloadjs-0.4.1.min.js',
                    'bower_components/handlebars/handlebars.min.js',
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/detectizr/detectizr.min.js'

                ],
                dest: 'js/vendor/vendor.js',
            },
        },
        watch: {
            // TODO : ??
            /*options: {
                nospawn: true,
                livereload: true
            },*/
            compass: {
                files: ['styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server'] // TODO : add clean ?
            },
            coffee: {
                files: ['scripts/{,*/}*.coffee'],
                tasks: ['coffee'] // TODO : add clean ?
            },
            php : {
                files : ['{,*/}*.php'],
                options : {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '*.{html,php}',
                    'css/{,*/}*.css',
                    'js/{,*/}*.js',
                    '!js/vendor/*',
                    'images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },
        clean: ['css/*', 'js/*'],
        coffee: {
            server: {
                options: {
                    join: true
                },
                files: {
                    'js/main.js': 'scripts/{,*/}*.coffee'
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    //expand: true,
                    //cwd: 'scripts',
                    //src: '{,*/}*.coffee',
                    //dest: 'js/',
                    //ext: '.js'
                }
            }
        },
        compass: {
            options: {
                sassDir: 'styles',
                cssDir: 'css',
                generatedImagesDir: 'images/generated',
                imagesDir: 'images',
                javascriptsDir: 'js',
                fontsDir: 'css/fonts',
                importPath: 'bower_components',
                //httpImagesPath: '/images',
                //httpGeneratedImagesPath: '/images/generated',
                //httpFontsPath: '/css/fonts',
                relativeAssets: true,
                assetCacheBuster: false
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        copy: {
            fonts: {
                expand: true,
                cwd: 'styles/fonts',
                dest: 'css/fonts',
                src: '{,*/}*.{eot,svg,ttf,woff}'
            }
        },
        cssmin: {
            dist: {
                files: {
                    'css/main.css': ['css/main.css']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'js/main.js': ['js/main.js'],
                    'js/vendor/vendor.js': ['js/vendor/vendor.js']
                }
            }
        },
        // TODO : Add to watch
        modernizr: {
            devFile: 'bower_components/modernizr/modernizr.js',
            outputFile: 'js/vendor/modernizr.js',
            files: [
                'js/{,*/}*.js',
                'css/{,*/}*.css',
                '!js/vendor/*'
            ],
            uglify: true
        },
        concurrent: {
            server: [
                'compass:server',
                'coffee'
            ],
            dist: [
                'compass',
                'coffee',
            ]
        }
    });

    grunt.registerTask('serve',  [
        'clean',
        'copy',
        'concat:vendor',
        'concurrent:server',
        'modernizr',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'concat:vendor',
        'concurrent:dist',
        'modernizr',
        'cssmin',
        'uglify'
    ]);
};
