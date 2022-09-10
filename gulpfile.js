"use strict";

const { watch, series, parallel, src, dest } = require('gulp');
var uglify = require("gulp-uglify");

//const sass = require("gulp-sass");
const sass = require("gulp-sass")(require("sass"));
const connect = require('gulp-connect'); // Runs a local webserver
const open = require('gulp-open'); // Opens a URL in a web browser

var gulp = require("gulp"),
  sourcemaps = require("gulp-sourcemaps"),
  concat = require("gulp-concat"),
  cleanCSS = require("gulp-clean-css"),
  replace = require("gulp-replace");

// Launch Chrome web browser
// https://www.npmjs.com/package/gulp-open
gulp.task("openBrowser", function openBrowser(done) {
  var options = {
  uri: 'http://localhost:8080'
  };
  return src('./')
  .pipe(open(options));
  done();
});

// Gulp plugin to run a webserver (with LiveReload)
// https://www.npmjs.com/package/gulp-connect
gulp.task("server", function server(done) {
  return connect.server({
  root: './',
  port: 8080,
  debug: true,
  });
  done();
});

gulp.task("sass", function () {
  return gulp
    .src("./assets/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(sourcemaps.write(".", { addComment: false }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./assets/css"));
});

gulp.task("sass-critical", function () {
  return gulp
    .src("./assets/scss/critical.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("./assets/css"));
});

gulp.task("sass:watch", function () {
  gulp.watch("./assets/scss/**/*.scss", gulp.series("sass-critical", "sass"));
});
