'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import refresh from 'gulp-refresh';
import htmlmin from 'gulp-htmlmin';
import clean from 'gulp-clean';
import inject from 'gulp-inject';
import es from 'event-stream';
import bro from 'gulp-bro';
import colors from 'colors';

const dir = {
    src: 'src',
    dest: './dist'
};

gulp.task('styles', done => {
    gulp.src(`${dir.src}/styles/**/*.scss`)
        .pipe(plumber(error => {
            console.log(error.toString());
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dir.dest))
        .pipe(refresh());

    done();
});

const appStream = gulp.src([`${dir.src}/scripts/**/*.js`, `!${dir.src}/scripts/**/*.test.js`])
    .pipe(bro())
    .pipe(plumber(error => {
        console.log(error.toString());
        this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dir.dest));

gulp.task('scripts', () => {
    return new Promise((resolve, reject) => {
        resolve();
        return appStream;
    });
});

gulp.task('minify', () => {
    return new Promise((resolve, reject) => {
        resolve();
        return gulp.src(`${dir.src}/*.html`)
            .pipe(plumber(error => {
                console.log(error.toString());
                this.emit('end');
            }))
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(inject((appStream), {
                removeTags: true
            }))
            .pipe(gulp.dest('./'));
    });
});

gulp.task('clean', () => {
    return gulp.src(dir.dest, { read: false, allowEmpty: true })
        .pipe(plumber(error => {
            console.log(error.toString());
            this.emit('end');
        }))
        .pipe(clean());
});

gulp.task('default', gulp.series('clean', 'styles', 'minify'));

gulp.task('watch', () => {
    refresh.listen();
    gulp.watch(`${dir.src}/styles/**/*.scss`, gulp.series('styles')).on('change', e => {
        console.log(`           File ${e} changed`.yellow);
    });
    gulp.watch([
        `${dir.src}/scripts/**/*.js`, `!${dir.src}/scripts/**/*.test.js`
    ], gulp.series('scripts')).on('change', e => {
        console.log(`           File ${e} changed`.yellow);
    });
    gulp.watch(`${dir.src}/*.html`, gulp.series('minify')).on('change', e => {
        console.log(`           File ${e} changed`.yellow);
    });
});
