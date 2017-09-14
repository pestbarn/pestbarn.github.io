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
import htmlmin from 'gulp-htmlmin';
import clean from 'gulp-clean';
import inject from 'gulp-inject';
import es from 'event-stream';

const dir = {
    src: 'src',
    dest: './dist'
};

gulp.task('styles', () => {
    gulp.src(`${dir.src}/styles/**/*.scss`)
        .pipe(plumber(error => {
            console.log(error.toString());
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dir.dest))
        .pipe(livereload());
});

const vendorStream = gulp.src('./static/**/*.js')
    .pipe(plumber(error => {
        console.log(error.toString());
        this.emit('end');
    }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dir.dest));

const appStream = gulp.src(`${dir.src}/scripts/**/*.js`)
    .pipe(plumber(error => {
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
    .pipe(gulp.dest(dir.dest));

gulp.task('vendor', () => {
    gulp.src('./static/**/*.js')
    .pipe(plumber(error => {
        console.log(error.toString());
        this.emit('end');
    }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dir.dest));
});

gulp.task('scripts', ['vendor'], () => {
    return gulp.src(`${dir.src}/scripts/**/*.js`)
    .pipe(plumber(error => {
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
    .pipe(gulp.dest(dir.dest));
});

gulp.task('minify', () => {
    return gulp.src(`${dir.src}/*.html`)
    .pipe(plumber(error => {
        console.log(error.toString());
        this.emit('end');
    }))
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(inject(es.merge(vendorStream, appStream), {
        removeTags: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('clean', () => {
    return gulp.src(dir.dest, { read: false })
    .pipe(plumber(error => {
        console.log(error.toString());
        this.emit('end');
    }))
    .pipe(clean());
});

gulp.task('default', ['clean', 'styles', 'minify']);

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch(`${dir.src}/styles/**/*.scss`, ['styles']).on('change', e => {
        console.log('\t   File ' + e.type + '...');
    });
    gulp.watch(`${dir.src}/scripts/**/*.js`, ['scripts']).on('change', e => {
        console.log('\t   File ' + e.type + '...');
    });
    gulp.watch(`${dir.src}/*.html`, ['minify']).on('change', e => {
        console.log('\t   File ' + e.type + '...');
    });
});
