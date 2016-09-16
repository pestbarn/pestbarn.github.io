var gulp = require('gulp');
var haml = require('gulp-haml');
var postcss = require('gulp-postcss');
var postcss_cssnext = require('postcss-cssnext');
var precss = require('precss');
var uglify = require('gulp-uglify');
var pump = require('pump');

var paths = {
    haml: './src/haml/*.haml',
    postcss_src: './src/css/*.css',
    postcss_bin: './bin/css/',
    js_src: './src/js/*.js',
    js_bin: './bin/js/'
};

gulp.task('haml', function () {
    return gulp.src(paths.haml)
    .pipe(haml({ext: '.html', compilerOpts: { ugly: false }}))
    .pipe(gulp.dest('./'));
});

gulp.task('css', function() {
    var processors = [
        postcss_cssnext,
        precss
    ];
    return gulp.src(paths.postcss_src)
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.postcss_bin));
});

gulp.task('js', function(callback){
    pump([
        gulp.src(paths.js_src),
        uglify(),
        gulp.dest(paths.js_bin)
    ]),
    callback
});

gulp.task('watch', function() {
    gulp.watch(paths.haml, ['haml']);
    gulp.watch(paths.postcss_src, ['css']);
    gulp.watch(paths.js_src, ['js']);
});

gulp.task('default', ['haml', 'css', 'js']);
