var gulp            = require('gulp');
var gutil           = require('gulp-util');
var concat          = require('gulp-concat');
var srcmaps         = require('gulp-sourcemaps');
var notify          = require('gulp-notify');
var rev             = require('gulp-rev');
var del             = require('del');
var merge           = require('merge-stream');
var config          = require('../../config').assets.js;

gulp.task('scripts', function () {
    var assets = config.src;
    var destination = config.dest;

    var tasks = Object.keys(assets).map(function (asset) {
        del(config.rev.dest + '/' + asset + '-*.js');
        return gulp.src(assets[asset])
                   .pipe(srcmaps.init({loadMaps: true}))
                   .pipe(concat(asset + ".js"))
                   .pipe(srcmaps.write('maps'))
                   .pipe(gulp.dest(destination))
                   .pipe(notify(asset + '.js compiled and combined'));
    });
    var copy = gulp.src(config.copy)
                   .pipe(gulp.dest(destination))
                   .pipe(notify('scripts copied'));

    return merge(tasks, copy);
});
