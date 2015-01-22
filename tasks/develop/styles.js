var gulp            = require('gulp');
var gutil           = require('gulp-util');
var concat          = require('gulp-concat');
var exclude         = require('gulp-ignore').exclude;
var srcmaps         = require('gulp-sourcemaps');
var gulpFilter      = require('gulp-filter');
var notify          = require('gulp-notify');
var rev             = require('gulp-rev');
var del             = require('del');
var merge           = require('merge-stream');
var less            = require('gulp-less')
var prefix          = require('gulp-autoprefixer');
var config          = require('../../config').assets.css;

gulp.task('styles', function () {
    var assets = config.src;
    var destination = config.dest;

    var tasks = Object.keys(assets).map(function (asset) {
        del(config.rev.dest + '/' + asset + '-*.css');
        return gulp.src(assets[asset])
               .pipe(less().on('error', gutil.log))
               .pipe(srcmaps.init({loadMaps: true}))
               .pipe(concat(asset + ".css"))
               .pipe(prefix(config.autoprefixer))
               .pipe(srcmaps.write('maps'))
               .pipe(gulp.dest(destination))
               .pipe(notify(asset + '.css compiled'));
    });
    return merge(tasks);
});
