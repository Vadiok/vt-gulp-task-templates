var gulp = require("gulp");

var del = require("del");
var rename = require("gulp-rename");
var sourceMaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

var tsc = require('gulp-tsc');


var helper = require("./common");


var compile = function() {
	var sourceFileName = helper.cfg("ts.mainFile", "main");
	var sourceFile = helper.dir.source(helper.cfg("ts.sourceDir", "script")) + sourceFileName + ".ts";
	var resultFileName = helper.cfg("js.fileName", "main");
	var resultDir = helper.dir.build(helper.cfg("js.buildDir", "js"));
	gulp
		.src(sourceFile)
		.pipe(tsc({
			sourcemap: true,
			out: resultFileName + ".js",
			module: "system", // amd, system
			target: "es3",    // es3 (default), es5, es6
			emitError: false
		}))
		.pipe(gulp.dest(resultDir))
		.on('end', function() {
			gulp
				.src(resultDir + "/" + resultFileName + ".js")
				.pipe(sourceMaps.init())
				.pipe(uglify())
				.pipe(rename(resultFileName + ".min.js"))
				.pipe(sourceMaps.write(helper.cfg("ts.sourceMapDir", ".")))
				.pipe(gulp.dest(resultDir));
		});
};
gulp.task(helper.cfg("ts.tasks.compile", "ts"), compile);

var clean = function() {
	var buildDir = helper.dir.build(helper.cfg("js.buildDir", "js"));
	var fileName = buildDir + "/" + helper.cfg("js.fileName", "main");
	var files = [
		fileName + ".js",
		fileName + ".min.js",
		fileName + ".js.map",
		fileName + ".min.js.map"
	];
	del(files).then(function(paths) {
		console.log("Deleted files:\n", paths.join("\n"));
	});
};
gulp.task(helper.cfg("ts.tasks.clean", "ts:clean"), clean);

var watch = function() {
	var files = helper.dir.source(helper.cfg("ts.sourceDir", "script")) + "*.ts";
	console.log(helper.cfg("ts.tasks.watch", "ts:watch") + " :: watching " + files);
	return gulp.watch([files], [helper.cfg("ts.tasks.compile", "ts")]);
};
gulp.task(helper.cfg("ts.tasks.watch", "ts:watch"), watch);