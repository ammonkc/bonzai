var gutil = require('gulp-util');

/////////////////////////////////
// Base directories
////////////////////////////////
// Main source and target directories
// These are currently set for use with laravel 5.  See my example source folder structure  here: http://screencast.com/t/XWeafjr4Q4l
var basePaths = {
    src: 'resources/assets',
    dest: 'public/assets',
    bower: 'vendor/bower_components',
    app: 'app'
};

var config = {
    production: !! gutil.env.production,
    assets: {
        folders: {
            css: basePaths.dest + '/css',
            js: basePaths.dest + '/js',
            img: basePaths.dest + '/img',
            font: basePaths.dest + '/fonts',
            ico: basePaths.dest + '/ico',
            build: basePaths.dest + '/build'
        },
        css: {
            src: {
                app: [
                    basePaths.src + '/less/app.less',
                    basePaths.bower + '/bootstrap/less/bootstrap.less',
                    basePaths.bower + '/font-awesome/less/font-awesome.less'
                ],
                form: [
                    basePaths.bower + '/pickadate/lib/themes-source/default.less',
                    basePaths.bower + '/pickadate/lib/themes-source/default.date.less',
                    basePaths.bower + '/pickadate/lib/themes-source/default.time.less',
                    basePaths.bower + '/bootstrap-select/less/bootstrap-select.less',
                    basePaths.bower + '/bootstrap-switch/src/less/bootstrap3/build.less'
                ]
            },
            dest: basePaths.dest + '/css',
            autoprefixer: {
              browsers: [
                'last 2 versions',
                'safari 5',
                'ie 8',
                'ie 9',
                'opera 12.1',
                'android 4'
              ],
              cascade: true
            },
            rev: {
                dest: basePaths.dest + '/build',
                manifest: {
                    src: basePaths.dest + '/build/manifests/css-manifest.json',
                    dest: basePaths.dest + '/build/manifests'
                }
            }
        },
        js: {
            src: {
                app: [
                    basePaths.src + '/js/console.log.js',
                    basePaths.bower + '/bootstrap/dist/js/bootstrap.min.js',
                    basePaths.bower + '/underscore/underscore-min.js',
                    basePaths.src + '/js/jquery.exists.js',
                    basePaths.src + '/js/app.js'
                ],
                form: [
                    basePaths.bower + '/jquery-validation/dist/jquery.validate.min.js',
                    basePaths.bower + '/jquery-validation/dist/additional-methods.min.js',
                    basePaths.bower + '/pickadate/lib/compressed/picker.js',
                    basePaths.bower + '/pickadate/lib/compressed/picker.date.js',
                    basePaths.bower + '/pickadate/lib/compressed/picker.time.js',
                    basePaths.bower + '/pickadate/lib/compressed/legacy.js',
                    basePaths.bower + '/bootstrap-select/dist/js/bootstrap-select.min.js',
                    basePaths.bower + '/bootstrap-switch/dist/js/bootstrap-switch.min.js'
                ],
                ie: [basePaths.bower + '/respond/dest/respond.min.js']
            },
            dest: basePaths.dest + '/js',
            copy: [
                basePaths.bower + '/jquery/dist/jquery.min.js',
                basePaths.bower + '/modernizr/modernizr.js'
            ],
            rev: {
                dest: basePaths.dest + '/build',
                manifest: {
                    src: basePaths.dest + '/build/manifests/js-manifest.json',
                    dest: basePaths.dest + '/build/manifests'
                }
            }
        },
        img: {
            src: [basePaths.src + '/img/**/*.{png,gif,jpg,jpeg,webp}'],
            dest: basePaths.dest + '/img',
            options: {
                optimizationLevel: 3,
                progessive: true,
                interlaced: true
            }
        },
        font: {
            src: [
                basePaths.bower + '/bootstrap/dist/**/*.{ttf,woff,eot,svg,otf}',
                basePaths.bower + '/font-awesome/**/*.{ttf,woff,eot,svg,otf}',
                basePaths.src + '/fonts/**/*.{ttf,woff,eot,svg,otf}'
            ],
            dest: basePaths.dest + '/fonts'
        },
        ico: {
            src: [basePaths.src + '/ico/**/*.{ico,png}'],
            dest: basePaths.dest + '/ico'
        },
    },
    base64: {
        src: basePaths.src + '/css/*.css',
        dest: basePaths.src + '/css',
        options: {
            baseDir: basePaths.dest,
            extensions: ['png'],
            maxImageSize: 20 * 1024, // bytes
            debug: false
        }
    },
    webp: {
      src: basePaths.src + '/img/**/*.{jpg,jpeg,png}',
      dest: basePaths.dest + '/img',
      options: {}
    },
    watch: {
        css: [
            basePaths.src + '/css/**/*.css',
            basePaths.src + '/less/**/*.{css,less}',
            basePaths.src + '/sass/**/*.{css,scss}'
        ],
        js: [basePaths.src + '/js/**/*.{js,coffee}'],
        img: [basePaths.src + '/img/**/*.{png,gif,jpg,jpeg,webp}'],
        font: [basePaths.src + '/fonts/**/*.{ttf,woff,eot,svg,otf}'],
        ico: [basePaths.src + '/ico/**/*.{ico,png}']
    },
    jshint: {
        src: [basePaths.src + '/js/**/*.{js,coffee}']
    },
    revision: {
        src: {
            assets: [
                basePaths.dest + '/css/*.min.css',
                basePaths.dest + '/js/*.min.js'
            ],
            base: basePaths.dest
        },
        dest: {
            assets: basePaths.dest + '/build',
            manifest: {
                name: 'manifest.json',
                path: basePaths.dest + '/build'
            }
        }
    },
    browsersync: {
        develop: {
            server: {
                baseDir: [basePaths.src, basePaths.app]
            },
            port: 9999,
            files: [
                basePaths.src + '/css/*.css',
                basePaths.src + '/js/*.js',
                basePaths.src + '/img/**',
                basePaths.src + '/fonts/*'
            ]
        },
        production: {
            server: {
                baseDir: [basePaths.dest]
            },
            port: 9998
        }
    },
    livereload: {
        port: 35729
    }
};

module.exports = config;

