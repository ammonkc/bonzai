var gutil = require('gulp-util');
var fs    = require('fs');
var _     = require('underscore');

var paths = {
    src: 'resources/assets',
    dest: 'public/assets',
    bower: 'vendor/bower_components',
    app: 'app'
};

var config = {
    options: {
        production: !! gutil.env.production
    },
    tasks: [],
    paths: {},
    assets: {
        folders: {
            css: paths.dest + '/css',
            js: paths.dest + '/js',
            img: paths.dest + '/img',
            font: paths.dest + '/fonts',
            ico: paths.dest + '/ico',
            build: paths.dest + '/build'
        },
        css: {
            src: {
                app: [
                    paths.src + '/less/app.less',
                    paths.bower + '/bootstrap/less/bootstrap.less',
                    paths.bower + '/font-awesome/less/font-awesome.less'
                ],
                form: [
                    paths.bower + '/pickadate/lib/themes-source/default.less',
                    paths.bower + '/pickadate/lib/themes-source/default.date.less',
                    paths.bower + '/pickadate/lib/themes-source/default.time.less',
                    paths.bower + '/bootstrap-select/less/bootstrap-select.less',
                    paths.bower + '/bootstrap-switch/src/less/bootstrap3/build.less'
                ]
            },
            dest: paths.dest + '/css',
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
                dest: paths.dest + '/build',
                manifest: {
                    src: paths.dest + '/build/manifests/css-manifest.json',
                    dest: paths.dest + '/build/manifests'
                }
            }
        },
        js: {
            src: {
                app: [
                    paths.src + '/js/console.log.js',
                    paths.bower + '/bootstrap/dist/js/bootstrap.min.js',
                    paths.bower + '/underscore/underscore-min.js',
                    paths.src + '/js/jquery.exists.js',
                    paths.src + '/js/app.js'
                ],
                form: [
                    paths.bower + '/jquery-validation/dist/jquery.validate.min.js',
                    paths.bower + '/jquery-validation/dist/additional-methods.min.js',
                    paths.bower + '/pickadate/lib/compressed/picker.js',
                    paths.bower + '/pickadate/lib/compressed/picker.date.js',
                    paths.bower + '/pickadate/lib/compressed/picker.time.js',
                    paths.bower + '/pickadate/lib/compressed/legacy.js',
                    paths.bower + '/bootstrap-select/dist/js/bootstrap-select.min.js',
                    paths.bower + '/bootstrap-switch/dist/js/bootstrap-switch.min.js'
                ],
                ie: [paths.bower + '/respond/dest/respond.min.js']
            },
            dest: paths.dest + '/js',
            copy: [
                paths.bower + '/jquery/dist/jquery.min.js',
                paths.bower + '/modernizr/modernizr.js'
            ],
            rev: {
                dest: paths.dest + '/build',
                manifest: {
                    src: paths.dest + '/build/manifests/js-manifest.json',
                    dest: paths.dest + '/build/manifests'
                }
            }
        },
        img: {
            src: [paths.src + '/img/**/*.{png,gif,jpg,jpeg,webp}'],
            dest: paths.dest + '/img',
            options: {
                optimizationLevel: 3,
                progessive: true,
                interlaced: true
            }
        },
        font: {
            src: [
                paths.bower + '/bootstrap/dist/**/*.{ttf,woff,eot,svg,otf}',
                paths.bower + '/font-awesome/**/*.{ttf,woff,eot,svg,otf}',
                paths.src + '/fonts/**/*.{ttf,woff,eot,svg,otf}'
            ],
            dest: paths.dest + '/fonts'
        },
        ico: {
            src: [paths.src + '/ico/**/*.{ico,png}'],
            dest: paths.dest + '/ico'
        },
    },
    watch: {
        css: [
            paths.src + '/css/**/*.css',
            paths.src + '/less/**/*.{css,less}',
            paths.src + '/sass/**/*.{css,scss}'
        ],
        js: [paths.src + '/js/**/*.{js,coffee}'],
        img: [paths.src + '/img/**/*.{png,gif,jpg,jpeg,webp}'],
        font: [paths.src + '/fonts/**/*.{ttf,woff,eot,svg,otf}'],
        ico: [paths.src + '/ico/**/*.{ico,png}']
    },
    jshint: {
        src: [paths.src + '/js/**/*.{js,coffee}']
    },
    browsersync: {
        develop: {
            server: {
                baseDir: [paths.src, paths.app]
            },
            port: 9999,
            files: [
                paths.src + '/css/*.css',
                paths.src + '/js/*.js',
                paths.src + '/img/**',
                paths.src + '/fonts/*'
            ]
        },
        production: {
            server: {
                baseDir: [paths.dest]
            },
            port: 9998
        }
    },
    livereload: {
        port: 35729
    }
};

// var config = {
//     production: !! gutil.env.production,
//     srcDir: 'app',
//     assetsDir: 'resources/assets/',
//     cssOutput: 'public/css',
//     jsOutput: 'public/js',
//     bowerDir: 'vendor/bower_components',
//     tasks: [],
//     watchers: { default: {} },
//     duplicate: [],
//     concatenate: { css: [], js: [] }
// };


/**
 * Designate that the given task should be watched.
 *
 * @param {string} task
 * @param {string} search
 * @param {string} group
 */
config.registerWatcher = function(task, search, group) {
    group = group || 'default';

    this.watchers[group] = this.watchers[group] || {};

    this.watchers[group][task] = search;

    return this;
}


/**
 * Register the given task to be triggered by Gulp.
 *
 * @param {string} task
 */
config.queueTask = function(task) {
    if (this.tasks.indexOf(task) == -1)
    {
        this.tasks.push(task);
    }

    return this;
};


/**
 * Set the default directory paths.
 *
 * @param {string} file
 */
config.setDefaultsFrom = function(file) {
    var defaults;

    if (fs.existsSync(file)) {
        defaults = JSON.parse(fs.readFileSync(file, 'utf8'));

        _.extend(paths, defaults.paths);
        _.extend(this.paths, paths);
        // _.extend(this.assets, defaults.assets);
        // _.extend(this.watch, defaults.watch);
        // _.extend(this.jshint, defaults.jshint);
        // _.extend(this.browsersync, defaults.browsersync);
        // _.extend(this.livereload, defaults.livereload);

        // _.extend(this, defaults);
    }
};


module.exports = config;
