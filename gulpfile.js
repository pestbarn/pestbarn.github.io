var gulp = require('gulp');
var postcss = require('gulp-postcss');
var postcss_cssnext = require('postcss-cssnext');
var precss = require('precss');

gulp.task('css', function() {
  var processors = [
    postcss_cssnext,
    precss
  ];
  return gulp.src('./src/css/*.css')
             .pipe(postcss(processors))
             .pipe(gulp.dest('./bin/css/'));
});
