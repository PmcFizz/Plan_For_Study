var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	header = require("gulp-header"),
	watch = require("gulp-watch"),
	changed = require("gulp-changed");

var dist = "dist", //处理后的文件目录
	distjs = "dist/js",
	distview = "dist/view";

var sourcejs = "js/**/*.js",
	sorucehtml = "view/**/*.html";

/**
 * 压缩整个目录的js 并加.min.js 输出到dist/js目录
 */
gulp.task("uglifyjs", function() {
	gulp.src(sourcejs)
		.pipe(uglify())
		.pipe(rename({
			extname: ".min.js"
		}))
		.pipe(gulp.dest(dist + "/js"))
});

/**
 * 监听源js文件  改动后实时自动压缩
 */
gulp.task("autouglifyjs", function() {
	gulp.src(sourcejs)
		.pipe(watch(sourcejs))
		.pipe(uglify())
		.pipe(rename({
			extname: ".min.js"
		}))
		.pipe(gulp.dest(distjs))
});

/**
 * 只传递修改过后的源js 进行压缩
 */
gulp.task("onlychangejs", function() {
	gulp.src(sourcejs)
		.pipe(changed(distjs))
		.pipe(uglify())
		.pipe(rename({
			extname: ".min.js"
		}))
		.pipe(gulp.dest(distjs))
});

/**
   * 编译html变成jsp
   */
var jspHeader = [];
jspHeader.push('<!--请在这里写页面注释-->\n');
jspHeader.push('<%= start %>@page language="java" import="java.unil.*" pageEncodeing="UTF-8"<%= end %>\n');
jspHeader.push('<%= start %>\nString path =request.getContextPath();\n');
jspHeader.push('String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";\n<%= end %>\n');
jspHeader = jspHeader.join('');
gulp.task("htmltojsp", function() {
	gulp.src("view/**/*.html")
		.pipe(header(jspHeader, {start: "<%",end: "%>"}))
		.pipe(rename({extname: ".jsp"}))
		.pipe(gulp.dest(distview))

})

/**
 * 使用gulp 搭配browsewr-sync 
 * 
 */

/**
 * 使用browser-sync 启动静态资源项目
*/
gulp.task("uglifyjs",function(){
	return gulp.src("js/**/*.js")
	.pipe(uglify())
	.pipie(rename({extname:".min.js"}))
	.pipe(gulp.dest("dist/js"))
})

gulp.task("browserSync",['uglifyjs'],function(){
	browserSync.init({
		server:{baseDir:"./"}
	})
	gulp.watch("js/**/*.js",["uglifyjs"]).on("change",browserSyne.reload);
	gulp.watch("view/**/*.html").on("change",browserSync.reload);
	gulp.watch("css/**/*.css").on("change",browserSync.reload);
})


gulp.task("default", function() {
	console.log("开始我的任务吧.....");
	gulp.run(['htmltojsp','autouglifyjs'])
});
