var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	changed = require("gulp-changed"),
	watch = require("gulp-watch"),
	header=require('gulp-header');

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


//修改html为jsp 并在jsp页头加java代码
var jspHeader=[];
jspHeader.push('<!--请在这里写页面注释-->\n');
jspHeader.push('<%= start %>@ page language="java" import="java.util.*" pageEncoding="UTF-8"<%= end %>\n');
jspHeader.push('<%= start %>\nString path = request.getContextPath();\n');
jspHeader.push('String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";\n<%= end %>\n');
jspHeader=jspHeader.join('');
gulp.task('htmltojsp', function() {
		gulp.src("view/**/*.html")
			.pipe(header(jspHeader,{start:"<%",end:"%>"}))
			.pipe(rename({
				extname: ".jsp"
			}))
			.pipe(gulp.dest("build"))
})

gulp.task("default", function() {
	console.log("task starting");

})
