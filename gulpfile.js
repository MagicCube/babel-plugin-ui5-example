const babel = require("gulp-babel");
const concat = require("gulp-concat");
const del = require("del");
const gulp = require("gulp");
const rename = require("gulp-rename");
const runSequence = require("run-sequence");
const uglify = require("gulp-uglify");

const SRC_ROOT = "./src";
const ASSETS_ROOT = "./assets";
const MODULES = [ "example" ];

MODULES.forEach(module => {
    // See generateBuildModuleTask(modul) bellow
    generateBuildModuleTask(module);
});

gulp.task("default", [ "build" ]);

gulp.task("clean", cb => {
    del(`${ASSETS_ROOT}/example`).then(() => {
        cb()
    }, reason => {
        cb(reason);
    });
});

gulp.task("build", [ "clean" ], cb => {
    // Let's build modules one by one,
    const params = MODULES.map(module => `build:${module}`);
    // and uglify *.all-dbg in the end.
    params.push("uglify-js");
    console.log("Building tasks:", params);

    // Don't forget our callback.
    params.push(cb);

    // Execute the workflow.
    runSequence.apply(this, params);
});

gulp.task("uglify-js", () => {
    return gulp.src(`${ASSETS_ROOT}/**/all-dbg.js`)
        .pipe(uglify())
        .pipe(rename(path => {
            path.basename = "all";
        }))
        .pipe(gulp.dest(`${ASSETS_ROOT}`));
});



// This will bring modulization concept to our UI5 project.
// Think your application or reusable library as a independent module.
function generateBuildModuleTask(module)
{
    gulp.task(`build:${module}`, cb => {
        runSequence(
            `build-js:${module}`,
            `concat-js:${module}`,
            cb
        );
    });

    gulp.task(`build-js:${module}`, () => {
        return gulp.src(`${SRC_ROOT}/${module}/**/*.js`)
            .pipe(babel())
            .pipe(gulp.dest(`${ASSETS_ROOT}/${module}`));
    });

    gulp.task(`concat-js:${module}`, () => {
        return gulp.src(`${ASSETS_ROOT}/${module}/**/*.js`)
            .pipe(concat("all-dbg.js"))
            .pipe(gulp.dest(`${ASSETS_ROOT}/${module}`));
    });
}
