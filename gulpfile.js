var gulp             = require('gulp');
var haml             = require('gulp-haml');
var postcss          = require('gulp-postcss');
var postcss_cssnext  = require('postcss-cssnext');
var precss           = require('precss');
var postcss_magician = require('postcss-font-magician');
var clean_css        = require('gulp-clean-css');
var concat_css       = require('gulp-concat-css');
var uglify           = require('gulp-uglify');
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

gulp.task('haml', function() {
    pump([
        gulp.src(paths.haml),
        haml({ext: '.html'}),
        gulp.dest('./')
    ]);
});

gulp.task('haml-partials', function() {
    pump([
        gulp.src(paths.haml_partials),
        haml({ext: '.html'}),
        gulp.dest('./bin/partials/')
    ]);
});

gulp.task('css', function() {
    pump([
        vfs.src([css[1],css[0]]),
        postcss(processors),
        concat_css('main.css'),
        vfs.dest('./bin/css/')
    ]);
});

gulp.task('minify', ['css'], function(){
    pump([
        vfs.src([css[1],css[0]]),
        postcss(processors),
        concat_css('main.min.css'),
        clean_css(),
        vfs.dest('./bin/css/')
    ]);
})

gulp.task('js', function(){
    pump([
        gulp.src(paths.js),
        uglify(),
        gulp.dest('./bin/js/'),
    ]);
});

gulp.task('watch', function() {
    gulp.watch(paths.haml, ['haml']);
    gulp.watch(paths.haml_partials, ['haml-partials']);
    gulp.watch(paths.css.base, [['css'],['minify']]);
    gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['haml', 'haml-partials', 'css', 'minify', 'js']);
