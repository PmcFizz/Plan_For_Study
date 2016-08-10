var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	changed = require("gulp-changed"),
	watch = require("gulp-watch"),
	concat=require("gulp-concat"),
	combiner=require("stream-combiner2"),
	del=require("del"),
	vinylPaths=require("vinyl-paths"),
	watchify=require("watchify"),
	browserify=require("browserify"),
	source=require("vinyl-source-stream"),
	buffer=require("vinyl-buffer"),
	gutil=require("gulp-util"),
	sourcemaps=require("gulp-sourcemaps"),
	assign=require("lodash.assign"),
	header=require("gulp-header"),
	footer=require("gulp-footer"),
	jshint=require("gulp-jshint"),
	cached=require("gulp-cached"),
	remember=require("gulp-remember");
	

var DEST = "build/js";
var scriptsGlob = "js/*.js";
var viewFiles="view/*.html";

//压缩js 同目录输出压缩后的js
gulp.task("ugjs", function() {
	gulp.src("js/*.js")
		.pipe(gulp.dest("js/"))
		.pipe(uglify())
		.pipe(rename({extname:".min.js"}))
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

//整合streams来处理错误
gulp.task("tryerror",function(){
	var combined=combiner.obj([
		gulp.src("bootstrap/js/*.js"),
		uglify(),
		gulp.dest("public/bootstrap")
	]);
	//任何在上面的stream 中发生错误,都不会抛出
	//而是被监听器捕获
	combined.on("error",console.error.bind(console));
})
//删除文件和文件夹
gulp.task("delfiles",function(cb){
	del([
		'dist/report.csv',
		'deist/mobile/**/*',
		'!dist/mobile/deploy.json'
	],cb);
});

//在管道内删除文件
gulp.task("highdel",function(){
	return gulp.src("tmp/*")
	.pipe(stripDebug())
	.pipe(gulp.dest('dist'))
	.pipe(vinylPaths(del));
});
//使用watchify加速browserify 编译
var customOpts={
	entries:['./src/index.js'],
	debug:true
}
var opts=assign({},watchify.args,customOpts);
var b=watchify(browserify(opts));
//在这里加入变换操作
//比如 b.transform(conffeeify);
gulp.task('js',bundle);  //这样你可以运行gulp js 来编译文件了
b.on('update',bundle);  //当任何依赖发生改变的时候,运行打包工具
b.on('log',gutil.log) //输出编译日记到终端

function bundle(){
	return b.bundle()
	//如果有错误发生,记录这些错误
	.on('error',gutil.log.bind(gutil,'Browserify Error'))
	.pipe(source('bundle.js'))
	//可选项,如果你不需要缓存文件 就删除
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps:true}))  //从browserify 文件载入map
	.pipe(sourcemaps.write('./'))  //写入.map文件
	.pipe(gulp.dest('./dist'));
}

//增量编译打包 包括处理整理所涉及的所有文件
var scriptGlob='src/**/*.js';
gulp.task('scripts',function(){
	return gulp.src(scriptGlob)
	.pipe(cached('scripts'))  //只传递更改过的文件
	.pipe(jshint())           //对这些更改过的文件做一些特别处理
	.pipe(header('(function(){'))   //比如jsinting ^^^
	.pipe(footer('})();'))           //增加一些类似模块封装的东西
	.pipe(remmeber('scripts'))       //把所有的文件放回stream
	.pipe(concat('app.js')) 		//做一些需要所有文件的操作
	.pipe(gulp.dest('public/'));
});

gulp.task('onwatch',function(){
	var watcher=gulp.watch(scriptGlob,['scripts']); //监视与scripts 任务中同样的为文件
	watcher.on('change',function(event){
		if(event.type==='deleted'){
			delete cached.cached.scripts[event.path];
			remember.forget('scripts',event.path);
		}
	})
})



gulp.task("default", function() {
	console.log("task starting");

})