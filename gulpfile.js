"use strict";

var uglify = require("gulp-uglify");

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  concat = require("gulp-concat"),
  cleanCSS = require("gulp-clean-css"),
  replace = require("gulp-replace");

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
