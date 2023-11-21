const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const cleanCSS = require("gulp-clean-css")
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")

gulp.task("styles", () => {
  return gulp
    .src(["src/scss/**/*.scss", "src/css/**/*.css"]) // Inclui arquivos SCSS e CSS
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("styles.min.css")) // Concatena todos os arquivos SCSS e CSS em um arquivo
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist"))
})

gulp.task("scripts", () => {
  return gulp
    .src("src/js/**/*.js")
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist"))
})

gulp.task("watch", () => {
  gulp.watch(["src/scss/**/*.scss", "src/css/**/*.css"], gulp.series("styles"))
  gulp.watch("src/js/**/*.js", gulp.series("scripts"))
})

gulp.task("default", gulp.parallel("styles", "scripts", "watch"))
