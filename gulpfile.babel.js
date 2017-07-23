'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import minifyCSS from 'gulp-minify-css';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import livereload from 'gulp-livereload';

const dir = {
    src: 'src',
    dest: 'dist'
};

gulp.task('styles', function() {
    gulp.src(`${dir.src}/styles/**/*.scss`)
        .pipe(plumber(function(error) {
            console.log(error.toString());
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${dir.dest}/`))
        .pipe(livereload());
});

gulp.task('scripts', () => {
    return gulp.src(`${dir.src}/scripts/**/*.js`)
        .pipe(plumber(function(error) {
            console.log(error.toString());
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${dir.dest}/`));
});

gulp.task('default', ['styles', 'scripts']);

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(`${dir.src}/styles/**/*.scss`, ['styles']).on('change', function(event) {
        console.log('\t   File ' + event.type + '...');
    });
    gulp.watch(`${dir.src}/scripts/**/*.js`, ['scripts']).on('change', function(event) {
        console.log('\t   File ' + event.type + '...');
    });
});
