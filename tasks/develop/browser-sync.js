var gulp        = require('gulp');
// var browsersync = require('browser-sync');
var config      = require('../../config').browsersync.develop;

/**
 * Run the build task and start a server with BrowserSync
 */
gulp.task('browsersync', function() {
  browsersync(config);
});