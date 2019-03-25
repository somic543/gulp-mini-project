const { src, dest, parallel, watch } = require('gulp');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;

sass.compiler = require('node-sass');

function js() {
  return src('client/javascript/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .on('error', function (err) { console.log( err ) })
    .pipe(dest('build/js'));
}

function scss() {
  return src('client/scss/**/*.scss')
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('build/css'));
}

function watcher() {  
  watch(['client/javascript/*.js'], parallel(js)); 
  watch(['client/scss/*.scss'], parallel(scss));
}

exports.js = js;
exports.scss = scss;
exports.watcher = watcher;
exports.build = parallel(js, scss);