var gulp        = require('gulp');
// var browsersync = require('browser-sync');
var config      = require('../../config').browsersync.production;

/**
 * Run the build task and start a server with BrowserSync
 */
gulp.task('browsersync:production', function() {
  browsersync(config);
});
