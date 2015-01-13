var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload');

//style
gulp.task('style', function(){
    gulp.src('app/**/*.css')
        .pipe(autoprefixer('last 2 versions'))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('css/'))
        .pipe(livereload());
});

//javascript
gulp.task('javascript', function(){
    gulp.src('app/**/*.js')
        .pipe(livereload());
});

//other html
gulp.task('other-html', function(){
    gulp.src('app/**/*.html')
        .pipe(livereload());
});

//index html
gulp.task('html', function(){
    gulp.src('index.html')
        .pipe(livereload());
});


// Watch task
gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('app/**/*.js', ['javascript']);
    gulp.watch('app/**/*.css', ['style']);
    gulp.watch('app/**/*.html', ['other-html']);
    gulp.watch('index.html', ['html']);

});


//gulp default task
gulp.task('default', ['style', 'javascript', 'html', 'watch']);