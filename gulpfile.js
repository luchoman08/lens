var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var through2 = require('through2');

gulp.task('browserify', function () {
    return gulp.src('./index.js')
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path)
                .bundle(function (err, res) {
                    if (err) { return next(err); }
                    file.contents = res;
                    next(null, file);
                });
        }))
        .on('error', function (error) {
            console.log(error.stack);
            this.emit('end');
        })
	.pipe(uglify())
        .pipe(rename('lens.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['browserify']);
