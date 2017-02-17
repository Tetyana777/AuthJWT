var gulp = require('gulp'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
htmlmin = require('gulp-htmlmin'),
gulpFilter = require('gulp-filter'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
Server = require('karma').Server,
mocha = require('gulp-mocha');
mongodbData = require('gulp-mongodb-data'),
server = require('gulp-express');

gulp.task('usemin', function() {
  return gulp.src('public/index.html')
    .pipe(usemin({
      html: [ function () {return htmlmin({ collapseWhitespace: true });} ],
      js: [ uglify, rev ],
      inlinejs: [ uglify ]
    }))
    .pipe(gulp.dest('build/'));
});


gulp.task('watch', function() {
  gulp.watch('tests/**/*', ['jasmine']);
});


gulp.task('server', function () {
     server.run(['server.js']);
     gulp.watch(['index.html', 'main.js', 'public/**/*.html', 'public/**/*.js'], server.notify);
     gulp.watch(['server.js', 'app_server/**/*.js'], [server.run]);
});


gulp.task('users', function() {
  gulp.src('db')
    .pipe(mongodbData({
      mongoUrl: 'mongodb://localhost:27017/db',
      idAsObjectID: false
    }));
});


 gulp.task('karma', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function (exitCode) {
        done();
        process.exit(exitCode);
    }).start();
}); 

gulp.task('mocha', function() {
  return gulp.src(['tests/app_server/test_*.js'], { read: false })
    .pipe(mocha(), function(exitCode){
       done();
      process.exit(exitCode); 
    });
});

gulp.task('default', ['usemin', 'watch', 'server', 'users', 'karma', 'mocha']);