var path = require('path');

var argv = require('yargs').argv,

    gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    gulpif     = require('gulp-if'),

    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    watchify   = require('watchify'),
    babelify   = require('babelify'),
    uglify     = require('gulp-uglify'),
    livereload = require('gulp-livereload'),

    less       = require('gulp-less'),
    minifyCSS  = require('gulp-minify-css');

var staticDirectory = './public/',

    jsDir = path.join(staticDirectory, 'js'),

    // Source and target JS files for Browserify
    jsMainFile      = './jsx/main.jsx',
    jsBundleFile    = path.join(jsDir, 'main.js'),

    // Source and target LESS files
    cssMainFile     = './less/main.less',
    cssFiles        = './less/**/*.less';

var bundler = browserify({
    entries: [jsMainFile],
    transform: [babelify],
    extensions: ['.jsx'],
    debug: !argv.production,
    cache: {},
    packageCache: {},
    fullPaths: true // for watchify
});

// Build JavaScript using Browserify
gulp.task('js', function() {
    return bundler
        .bundle()
        .pipe(source(jsBundleFile))
        .pipe(buffer())
        .pipe(gulpif(!argv.production, sourcemaps.init({loadMaps: true}))) // loads map from browserify file
        .pipe(gulpif(!argv.production, sourcemaps.write('./'))) // writes .map file
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulp.dest('./'));
});

// Build CSS
gulp.task('css', function(){
    return gulp.src(cssMainFile)
        .pipe(less())
        .pipe(gulpif(argv.production, minifyCSS({keepBreaks:true})))
        .pipe(gulp.dest(path.join(staticDirectory, 'css')))
        .pipe(livereload());
});

// Watch JS + CSS using watchify + gulp.watch
gulp.task('watchify', function() {
    var watcher  = watchify(bundler);
    livereload.listen();

    return watcher
        .on('error', gutil.log.bind(gutil, 'watchify error'))
        .on('update', function () {
            watcher.bundle()
                .pipe(source(jsBundleFile))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
                .pipe(sourcemaps.write('./')) // writes .map file
                .pipe(gulp.dest('./'))
                .pipe(livereload());

            gutil.log('rebundled');
        })
        .bundle() // Create the initial bundle when starting the task
        .pipe(source(jsBundleFile))
        .pipe(gulp.dest('./'))
        .pipe(livereload());
});

gulp.task('csswatch', function () {
    gulp.watch(cssFiles, ['css']);
});

gulp.task('watch', ['watchify', 'csswatch']);
gulp.task('default', ['js', 'css']);
