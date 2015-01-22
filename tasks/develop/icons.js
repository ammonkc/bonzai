var gulp            = require('gulp');
var flatten         = require('gulp-flatten');
var config          = require('../../config').assets.ico;

/**
 * Copy icons to folder
 */
gulp.task('icons', function() {
  return gulp.src(config.src)
    .pipe(flatten())
    .pipe(gulp.dest(config.dest));
});
