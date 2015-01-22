var gulp = require('gulp');
var inSequence = require('run-sequence');

gulp.task('dev', function() {
    inSequence('build', 'watch');
});
