/**
 * 最简单的gulp 默认任务
 */
var gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	sass = require("gulp-sass"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	stripDebug = require('gulp-strip-debug'),
	del = require('del'),
	vinylPaths = require('vinyl-paths'),
	combiner = require('stream-combiner2'),
	livereload = require('gulp-livereload'),
	del = require('del'),
	fs = require('fs'),
	header=require('gulp-header');
/**
 * 整合streams 来处理错误
 */
gulp.task('test', function() {
	var combined = combiner.obj([
		gulp.src('bootstrap/js/*.js'),
		uglify(),
		gulp.dest('public/bootstrap')
	]);
	//任何在上面的stream中发生的错误 都不会抛出
	//而是会被监听器捕获
	combined.on('error', console.error.bind(console));
	return combined;
})

/**
 * 删除文件和文件夹
 */

gulp.task('clean:mobile', function(cb) {
	del([
		'dist/report.csv',
		'dist/mobile/**/*',
		'!dist/mobile/deploy.json'
	], cb);
});

/**
 * 在管道中删除文件
 */
gulp.task('clean:tmp', function() {
	return gulp.src('temp/*')
		.pipe(stripDebug)
		.pipe(gulp.dest('dist'))
		.pipe(vinylPaths(del));
});

//检查脚本
gulp.task('lint', function() {
	gulp.src(['js/*.js', '!js/jquery*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

//合并,压缩文件
gulp.task('scripts', function() {
	gulp.src(['js/*.js', '!js/jquery*.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

//编译Sass
gulp.task('sass', function() {
	gulp.src('scss/*.scss')
		.pipe(sass())
		.pipe(rename('1.css'))
		.pipe(gulp.dest('css'))
})

//使用gulp-livereeload 自动刷新样式 或js
gulp.task('reloadcss', function() {
	gulp.src('css/*.css')
		.pipe(livereload());
})

//监听css修改事件
gulp.task('watchcss', function() {
	livereload.listen();
	gulp.watch('css/*.css', ['reloadcss'])
})

//删除一个文件
gulp.task("delfile",function(cb){
	del([
		"src"
	],cb)
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

//测试gulp-header
gulp.task("testheader",function(){
	gulp.src("js/he.js")
	.pipe(header("Hello"))
	.pipe(gulp.dest("build"))
})
//默认任务
gulp.task('default', function() {
	gulp.run('lint', 'sass', 'scripts');

	//监听文件变化
	gulp.watch('js/*.js', function() {
		gulp.run('lint', 'sass', 'scripts');
	});
});