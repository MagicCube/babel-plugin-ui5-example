const babel = require("gulp-babel");
const concat = require("gulp-concat");
const del = require("del");
const gulp = require("gulp");
const less = require("gulp-less");
const rename = require("gulp-rename");
const runSequence = require("run-sequence");
const uglify = require("gulp-uglify");
const ui5Lib = require("gulp-ui5-lib");

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
        cb();
    }, reason => {
        cb(reason);
    });
});

gulp.task("build", [ "clean" ], cb => {
    // Let's build modules one by one,
    const params = MODULES.map(module => `build:${module}`);

    // Don't forget our callback.
    params.push(cb);

    // Execute the workflow.
    runSequence.apply(this, params);
});



// This will bring modulization concept to our UI5 project.
// Think your application or reusable library as a independent module.
function generateBuildModuleTask(module)
{
    gulp.task(`build:${module}`, cb => {
        runSequence(
            `build-less:${module}`,
            `build-js:${module}`,
            `build-library:${module}`,
            cb
        );
    });

    gulp.task(`build-js:${module}`, () => {
        return gulp.src(`${SRC_ROOT}/${module}/**/*.js`)
            .pipe(babel())
            .pipe(gulp.dest(`${ASSETS_ROOT}/${module}`));
    });

    gulp.task(`build-less:${module}`, () => {
        return gulp.src(`${SRC_ROOT}/${module}/themes/base/library.less`)
            .pipe(less())
            .pipe(gulp.dest(`${ASSETS_ROOT}/${module}/themes/base`));
    });

    gulp.task(`build-library:${module}`, () => {
        return gulp.src(`${ASSETS_ROOT}/${module}/**/*.js`)
                   .pipe(uglify())
                   .pipe(ui5Lib(`${module}`))
                   .pipe(gulp.dest(`${ASSETS_ROOT}/${module}`));
    });
}
