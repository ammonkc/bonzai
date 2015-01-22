var gulp            = require('gulp');
var jshint          = require('gulp-jshint');
var stylish         = require('jshint-stylish');
var watch           = require('gulp-watch');
var plumber         = require('gulp-plumber');
var notify          = require('gulp-notify');
// Used in linting custom reporter
var map             = require('map-stream');
var events          = require('events');
var emmitter        = new events.EventEmitter();
var path            = require('path');
var config          = require('../../config').jshint;

// Custom linting reporter used for error notify
var jshintErrorReporter = map(function (file, cb) {
  if (!file.jshint.success) {
    file.jshint.results.forEach(function (err) {
      if (err) {
        //console.log(err);
        // Error message
        var msg = [
          path.basename(file.path) + ': ' + file.jshint.results.length + ' problems',
          'Line: ' + err.error.line,
          'Reason: ' + err.error.reason
        ];
        // Emit this error event
        emmitter.emit('error', new Error(msg.join('\n')));
      }
    });
  }
  cb(null, file);
});
// Error handler
var onError = function (err) {
  gutil.beep();
  console.log(err);
};

/**
 * Check JavaScript sytax with JSHint
 */
gulp.task('jshint', function() {
  return gulp.src(config.src)
    .pipe(watch(config.src))
    .pipe(plumber())
    .pipe(jshint('./.jshintrc', {fail:true}))
    .pipe(jshint.reporter(stylish))
    .pipe(jshintErrorReporter) // If error pop up a notify alert
    .on('error', notify.onError(function (error) {
        return error.message;
    }))
    .pipe(notify({
        title: 'JSHint',
        message: 'JSHint Passed!',
    }));
});
