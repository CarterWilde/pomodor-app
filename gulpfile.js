const gulp = require("gulp");

const ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json", { noImplicitAny: true });

const sourcemaps = require("gulp-sourcemaps");

const sass = require("gulp-sass");
sass.compiler = require("node-sass");

gulp.task("build.copy.views", () => {
    return gulp.src(["./Views/*.html"], ["!./Views/*.html.js"])
    .pipe(gulp.dest("./build/Views/"));
});

gulp.task("build.copy.resources", () => {
    return gulp.src(["./Resources/*"])
    .pipe(gulp.dest("./build/Resources"));
});

gulp.task("build.copy", gulp.parallel("build.copy.views"
                                     ,"build.copy.resources"));

gulp.task("build.compile.ts", () => {
    var tsResults = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResults.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("build/"));
});

gulp.task("build.compile.sass", () => {
    return gulp.src("./Styles/**/*.s*ss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./build/Styles"));
});

gulp.task("build.compile", gulp.parallel("build.compile.ts"
                                        ,"build.compile.sass"));

gulp.task("build", gulp.parallel("build.copy"
                                ,"build.compile"));