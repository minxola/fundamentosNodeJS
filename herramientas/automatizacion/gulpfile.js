const gulp = require('gulp');
const server = require('gulp-server-livereload');

//inicializar algo
gulp.task('build', function(cb){
    console.log('Building the site');
    setTimeout(cb, 1200);
});

//inicializar un servidor y recargar automaticamente
//la carpeta objetivo es 'www'
gulp.task('serve', function(cb){
    gulp.src('www')
        .pipe(server({
            livereload: true,
            open: true,
        }));
})

//encadenamiento de procesos, primero build, luego serve
gulp.task('default', gulp.series('build', 'serve'));