var gulp             = require('gulp');
var haml             = require('gulp-haml');
var postcss          = require('gulp-postcss');
var postcss_cssnext  = require('postcss-cssnext');
var precss           = require('precss');
var postcss_magician = require('postcss-font-magician');
var clean_css        = require('gulp-clean-css');
var concat_css       = require('gulp-concat-css');
var uglify           = require('gulp-uglify');
var babel            = require('gulp-babel');
var pump             = require('pump');
var vfs              = require('vinyl-fs');

var paths = {
    haml:           './src/haml/index.haml',
    haml_partials:  './src/haml/partials/*.haml',
    js:             './src/js/*.js',
    css: {
        base: 'src/css/**/*.css',
        normalize: 'node_modules/normalize.css/normalize.css'
    }
};

const css = Object.keys(paths.css).map(key => paths.css[key]);

var processors = [
    postcss_cssnext,
    precss,
    postcss_magician
];

gulp.task('haml', function(callback) {
    pump([
        gulp.src(paths.haml),
        haml({ext: '.html'}),
        gulp.dest('./')
    ], callback);
});

gulp.task('haml-partials', function(callback) {
    pump([
        gulp.src(paths.haml_partials),
        haml({ext: '.html'}),
        gulp.dest('./bin/partials/')
    ], callback);
});

gulp.task('css', function(callback) {
    pump([
        vfs.src([css[1],css[0]]),
        postcss(processors),
        concat_css('main.css'),
        vfs.dest('./bin/css/')
    ], callback);
});

gulp.task('minify', ['css'], function(callback){
    pump([
        vfs.src([css[1],css[0]]),
        postcss(processors),
        concat_css('main.min.css'),
        clean_css(),
        vfs.dest('./bin/css/')
    ], callback);
})

gulp.task('js', function(callback){
    pump([
        gulp.src(paths.js),
        babel({presets: ['es2015']}),
        uglify(),
        gulp.dest('./bin/js/')
    ], callback);
});

gulp.task('watch', function() {
    gulp.watch(paths.haml, ['haml']);
    gulp.watch(paths.haml_partials, ['haml-partials']);
    gulp.watch(paths.css.base, [['css'],['minify']]);
    gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['haml', 'haml-partials', 'css', 'minify', 'js']);
