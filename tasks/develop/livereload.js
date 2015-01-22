var gulp        = require('gulp');
// var livereload  = require('gulp-livereload');
var config      = require('../../config').livereload;

// LiveReload
gulp.task('livereload', function(next) {
    server.listen(config.port, function(err) {
        if (err) console.error(err);
        next();
    });
});
