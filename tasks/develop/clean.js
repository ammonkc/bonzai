var gulp            = require('gulp');
var del             = require('del');
var folders          = require('../../config').assets.folders;

gulp.task('clean', function () {
    // console.log('[NOTE] If you get a "Unable to delete" error... just try again');
    for (var folder in folders){
        del(folders[folder] + '/*', { force: true });
    }
});
