const babel = require("gulp-babel");
const concat = require("gulp-concat");
const del = require("del");
const gulp = require("gulp");
const runSequence = require("run-sequence");
const uglify = require("gulp-uglify");

const ASSETS_ROOT = "./assets";

gulp.task("default", [ "build" ]);

gulp.task("clean", cb => {
    del(`${ASSETS_ROOT}/example`).then(() => {
        cb()
    }, reason => {
        cb(reason);
    });
});

gulp.task("build", [ "clean" ], cb => {
    runSequence(
        "build-js",
        cb
    );
});

gulp.task("build-js", () => {
    return gulp.src("./src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest(`${ASSETS_ROOT}`))
        .pipe(concat("example/all-dbg.js"))
        .pipe(gulp.dest(`./${ASSETS_ROOT}`))
        .pipe(uglify())
        .pipe(gulp.dest(`./${ASSETS_ROOT}`));
});
