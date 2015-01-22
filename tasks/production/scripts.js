var gulp            = require('gulp');
var gutil           = require('gulp-util');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var rename          = require('gulp-rename');
var gulpFilter      = require('gulp-filter');
var srcmaps         = require('gulp-sourcemaps');
var notify          = require('gulp-notify');
var rev             = require('gulp-rev');
var del             = require('del');
var merge           = require('merge-stream');
var config          = require('../../config').assets.js;

gulp.task('scripts:production', function () {
    var assets = config.src;
    var destination = config.dest;

    var tasks = Object.keys(assets).map(function (asset) {
        del(config.rev.dest + '/' + asset + '.min-*.js');
        return gulp.src(assets[asset])
                   .pipe(concat(asset + ".js"))
                   .pipe(uglify({mangle: true}).on('error', gutil.log))
                   .pipe(rename({suffix: '.min'}))
                   .pipe(gulp.dest(destination))
                   .pipe(rev())
                   .pipe(gulp.dest(config.rev.dest))
                   .pipe(notify(asset + '.js compiled, combined, and compressed'));
    });
    var filter = gulpFilter(['*.js', '!*min.js']);
    var copy = gulp.src(config.copy)
                   .pipe(filter)
                   .pipe(uglify({mangle: true}).on('error', gutil.log))
                   .pipe(rename({suffix: '.min'}))
                   .pipe(filter.restore())
                   .pipe(gulp.dest(destination))
                   .pipe(notify('scripts copied'));

    var manifest = gulp.src(config.rev.manifest.src);
    return merge(tasks, copy, manifest)
             .pipe(rev.manifest({path: 'js-manifest.json'}))
             .pipe(gulp.dest(config.rev.manifest.dest));
});
