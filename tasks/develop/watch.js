var gulp   = require('gulp');
var config = require('../../config').watch;

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch', ['jshint'], function() {
  gulp.watch(config.css,     ['styles']);
  gulp.watch(config.js,      ['scripts']);
  gulp.watch(config.img,     ['images']);
  gulp.watch(config.font,    ['fonts']);
  gulp.watch(config.ico,     ['icons']);
});
