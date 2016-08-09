var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	changed = require("gulp-changed"),
	watch = require("gulp-watch");

var DEST = "build/js";
var scriptsGlob = "js/*.js";

//压缩js 同目录输出压缩后的js
gulp.task("ugjs", function() {
	gulp.src("js/*.js")
		.pipe(gulp.dest("js/"))
		.pipe(uglify())
		.pipe(rename({
			extname: ".min.js"
		}))
		.pipe(gulp.dest(DEST))
})

//只重新压缩被修改过的文件
gulp.task("watch", function() {
	gulp.src(scriptsGlob)
		.pipe(gulp.dest(scriptsGlob))
		.pipe(watch(scriptsGlob))
		.pipe(uglify())
		.pipe(rename({extname:".min.js"}))
		.pipe(gulp.dest(DEST))
})

//仅传递更改过的文件
gulp.task("onlychange", function() {
	gulp.src(scriptsGlob)
		.pipe(changed(DEST))
		.pipe(uglify())
		.pipe(gulp.dest(DEST));
})

gulp.task("default", function() {
	console.log("task starting");

})