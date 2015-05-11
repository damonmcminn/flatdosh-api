'use strict';

const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');

const SRC = ['es6/**/*.js', 'es6/*.js'];
const DEST = 'lib';

gulp.task('default', ['run', 'watch']);


gulp.task('watch', function() {
  
  gulp.watch(['es6/**/*.js', 'es6/*.js'], ['transpile']);
  gulp.watch(['spec/**/*.js'], ['test']);

});

gulp.task('transpile', ['babel'], test);

gulp.task('test', test);

function test() {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine({includeStackTrace: false}));
}

gulp.task('babel', function() {

  return gulp.src(SRC)
    // must compare last modified time as src will always be different to dest
    // as it's transpiled etc..
    .pipe(changed(DEST))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST));

});

gulp.task('fullTranspile', function() {

  return gulp.src(SRC)
    // must compare last modified time as src will always be different to dest
    // as it's transpiled etc..
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST));

});
gulp.task('run', ['fullTranspile'], function() {

  nodemon({
    script: 'nada.js',
    ext: 'js',
    ignore: 'es6',
    execMap: {
      js: 'node index.js --config=~/conf/flatdosh/conf.json'
    }
  });

});
