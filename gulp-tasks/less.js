var gulp       = require("gulp");

var del        = require("del");
var gulpIf     = require("gulp-if");
var rename     = require("gulp-rename");
var sourceMaps = require("gulp-sourcemaps");

var less       = require("gulp-less");
var prefix     = require("gulp-autoprefixer");
var cleanCSS   = require("gulp-clean-css");


var helper = require("./common");


var compile = function() {
	var sourceFileName = helper.cfg("less.mainFile", "main");
	var sourceFile = helper.dir.source(helper.cfg("less.sourceDir", "style")) + sourceFileName + ".less";
	var resultFileName = helper.cfg("css.fileName", "main");
	var resultDir = helper.dir.build(helper.cfg("css.buildDir", "style"));
	gulp
		.src(sourceFile)
		.pipe(sourceMaps.init())
		.pipe(less())
		.pipe(rename(resultFileName + ".css"))
		.pipe(gulpIf(helper.cfg("less.addPrefixes", false), prefix(helper.cfg("css.autoprefixerOptions", {}))))
		.pipe(gulpIf(helper.cfg("less.compress", true), cleanCSS()))
		.pipe(sourceMaps.write(helper.cfg("less.sourceMapDir", ".")))
		.pipe(gulp.dest(resultDir));
};
gulp.task(helper.cfg("less.tasks.compile", "less"), compile);

var clean = function() {
	var buildDir = helper.dir.build(helper.cfg("css.buildDir", "style"));
	var cssFile = buildDir + helper.cfg("css.fileName", "main") + ".css";
	var mapFile = cssFile + ".map";
	del([cssFile, mapFile]).then(function(paths) {
		console.log("Deleted files:\n", paths.join("\n"));
	});
};
gulp.task(helper.cfg("less.tasks.clean", "less:clean"), clean);

var watch = function() {
	var files = helper.dir.source(helper.cfg("less.sourceDir", "style")) + "**/*.less";
	console.log(helper.cfg("less.tasks.watch", "less:watch") + " :: watching " + files);
	return gulp.watch([files], [helper.cfg("less.tasks.compile", "less")]);
};
gulp.task(helper.cfg("less.tasks.watch", "less:watch"), watch);
