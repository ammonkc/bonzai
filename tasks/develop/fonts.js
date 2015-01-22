var gulp            = require('gulp');
var exclude         = require('gulp-ignore').exclude;
var flatten         = require('gulp-flatten');
var config          = require('../../config').assets.font;

/**
 * Copy fonts to folder
 */
gulp.task('fonts', function() {
  return gulp.src(config.src)
    .pipe(exclude(config.src + '/**/*test*'))
    .pipe(flatten())
    .pipe(gulp.dest(config.dest));
});
