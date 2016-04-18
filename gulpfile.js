const babel = require("gulp-babel");
const concat = require("gulp-concat");
const del = require("del");
const express = require("express");
const gulp = require("gulp");
const less = require("gulp-less");
const minifyCss = require("gulp-minify-css");
const rename = require("gulp-rename");
const runSequence = require("run-sequence");
const uglify = require("gulp-uglify");
const ui5Lib = require("gulp-ui5-lib");
const watch = require("gulp-watch");

const SRC_ROOT = "./client-src";
const ASSETS_ROOT = "./public/assets";
const MODULES = [ "example" ];

MODULES.forEach(module => {
    // See generateBuildModuleTask(modul) bellow
    generateBuildModuleTask(module);
    generateBuildDevModuleTask(module);
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

gulp.task("dev", [ "clean" ], cb => {
    // Let's build modules one by one,
    const params = MODULES.map(module => `build-dev:${module}`);

    params.unshift("server:start");

    // Don't forget our callback.
    params.push(cb);

    // Execute the workflow.
    runSequence.apply(this, params);
});

gulp.task("server:start", cb => {
    const app = express();
    app.use(express.static("./public"));
    app.listen(8080, () => {
        console.log("The dev-server is now running. Please visit http://localhost:8080/");
        cb();
    });
});




function generateBuildModuleTask(module)
{
    gulp.task(`build:${module}`, cb => {
        runSequence(
            [
                `build-less:${module}`,
                `build-js:${module}`,
            ],
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
            .pipe(minifyCss())
            .pipe(gulp.dest(`${ASSETS_ROOT}/${module}/themes/base`));
    });

    gulp.task(`build-library:${module}`, () => {
        return gulp.src(`${ASSETS_ROOT}/${module}/**/*.js`)
                   .pipe(uglify())
                   .pipe(ui5Lib(`${module}`))
                   .pipe(gulp.dest(`${ASSETS_ROOT}/${module}`));
    });
}

function generateBuildDevModuleTask(module)
{
    gulp.task(`build-dev:${module}`, cb => {
        runSequence(
            [
                `build-dev-js:${module}`,
                `build-dev-less:${module}`,
            ],
            cb
        );
    });

    gulp.task(`build-dev-js:${module}`, () => {
        const sourceFiles = `${SRC_ROOT}/${module}/**/*.js`;
        return gulp.src(sourceFiles)
                   .pipe(watch(sourceFiles))
                   .pipe(babel({ sourceMaps: "inline" }))
                   .pipe(gulp.dest(`${ASSETS_ROOT}/${module}`));
    });

    gulp.task(`build-dev-less:${module}`, [`build-less:${module}`], () => {
        const sourceFiles = `${SRC_ROOT}/${module}/**/*.less`;
        watch(sourceFiles, () => {
            runSequence(`build-less:${module}`);
        });
    });
}
