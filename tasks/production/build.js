var gulp = require('gulp');

gulp.task('build:production', [
        'styles:production',
        'scripts:production',
        'images:production',
        'fonts',
        'icons'
    ]);
