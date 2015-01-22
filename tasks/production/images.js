var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');
var size        = require('gulp-size');
var flatten     = require('gulp-flatten');
var config      = require('../../config').assets.img;

/**
 * Copy and minimize image files
 */
gulp.task('images:production', function() {
  return gulp.src(config.src)
    .pipe(imagemin(config.options))
    .pipe(flatten())
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});
