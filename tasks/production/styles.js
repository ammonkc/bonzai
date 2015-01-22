var gulp            = require('gulp');
var gutil           = require('gulp-util');
var concat          = require('gulp-concat');
var rename          = require('gulp-rename');
var exclude         = require('gulp-ignore').exclude;
var srcmaps         = require('gulp-sourcemaps');
var notify          = require('gulp-notify');
var rev             = require('gulp-rev');
var del             = require('del');
var merge           = require('merge-stream');
var less            = require('gulp-less')
var prefix          = require('gulp-autoprefixer');
var minifycss       = require('gulp-minify-css');
var config          = require('../../config').assets.css;

gulp.task('styles:production', function () {
    var assets = config.src;
    var destination = config.dest;

    var tasks = Object.keys(assets).map(function (asset) {
        del(config.rev.dest + '/' + asset + '.min-*.css');
        return gulp.src(assets[asset])
               .pipe(less().on('error', gutil.log))
               .pipe(concat(asset + ".css"))
               .pipe(prefix(config.autoprefixer))
               .pipe(minifycss())
               .pipe(rename({suffix: '.min'}))
               .pipe(gulp.dest(destination))
               .pipe(rev())
               .pipe(gulp.dest(config.rev.dest))
               .pipe(notify(asset + '.min.css compiled and minified'));
    });
    var manifest = gulp.src(config.rev.manifest.src);
    return merge(tasks, manifest)
             .pipe(rev.manifest({path: 'css-manifest.json'}))
             .pipe(gulp.dest(config.rev.manifest.dest));
});
