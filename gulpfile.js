const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

// compile scss -> css
function style(){
  //dir of scss file
  return gulp.src('./css/style.scss')
  .pipe(sass()) //compiler
  .pipe(autoprefixer()) //vendor prefixes
  .pipe(gulp.dest('./css')) //output folder
  .pipe(browserSync.stream());
}

function watch(){
  browserSync.init({
    server: {   //this will launch a local server
      baseDir: './'
    }
  });
  gulp.watch('./css/**/*.scss', style) //watch( './scss/**/*.scss, style' )
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;