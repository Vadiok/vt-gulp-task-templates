var gulp       = require("gulp");

var del        = require("del");
var gulpIf     = require("gulp-if");
var rename     = require("gulp-rename");
var sourceMaps = require("gulp-sourcemaps");

var sass       = require("gulp-sass");
var prefix     = require("gulp-autoprefixer");


var helper = require("./common");


var compile = function() {
	var sourceFileName = helper.cfg("scss.mainFile", "main");
	var sourceFile = helper.dir.source(helper.cfg("scss.sourceDir", "style")) + sourceFileName + ".scss";
	var resultFileName = helper.cfg("css.fileName", "main");
	var resultDir = helper.dir.build(helper.cfg("css.buildDir", "style"));
	gulp
		.src(sourceFile)
		.pipe(sourceMaps.init())
		.pipe(sass({outputStyle: helper.cfg("scss.outputStyle", "compressed")}).on("error", sass.logError))
		.pipe(rename(resultFileName + ".css"))
		.pipe(gulpIf(helper.cfg("scss.addPrefixes", false), prefix(helper.cfg("css.autoprefixerOptions", {}))))
		.pipe(sourceMaps.write(helper.cfg("scss.sourceMapDir", ".")))
		.pipe(gulp.dest(resultDir));
};
gulp.task(helper.cfg("scss.tasks.compile", "scss"), compile);

var clean = function() {
	var buildDir = helper.dir.build(helper.cfg("css.buildDir", "style"));
	var cssFile = buildDir + helper.cfg("css.fileName", "main") + ".css";
	var mapFile = cssFile + ".map";
	del([cssFile, mapFile]).then(function(paths) {
		console.log("Deleted files:\n", paths.join("\n"));
	});
};
gulp.task(helper.cfg("scss.tasks.clean", "scss:clean"), clean);

var watch = function() {
	var files = helper.dir.source(helper.cfg("scss.sourceDir", "style")) + "**/*.scss";
	console.log(helper.cfg("scss.tasks.watch", "scss:watch") + " :: watching " + files);
	return gulp.watch([files], [helper.cfg("scss.tasks.compile", "scss")]);
};
gulp.task(helper.cfg("scss.tasks.watch", "scss:watch"), watch);
