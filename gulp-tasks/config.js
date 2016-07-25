var config = {};

// Source and Result dirs
config.common = {
	sourceDir: "source",
	buildDir: "dist"
};

// CSS result subdir and filename, autoprefixer options
config.css = {
	buildDir: "style",
	fileName: "style",
	autoprefixerOptions: {
		browsers: ["> 1%", "last 2 versions", "IE 8"],
		remove: false // Remove outdated prefixes. Default is true.
	}
};

// JavaScript result subdir and filename
config.js = {
	buildDir: "js",
	fileName: "script"
};

// Template result subdir and extension
config.tpl = {
	buildDir:  ".",
	extension: "html"
};

// LESS config
config.less = {
	tasks: {
		compile: "less",
		clean:   "less:clean",
		watch:   "less:watch"
	},
	sourceDir:    "style",
	mainFile:     "main",
	sourceMapDir: ".", // "." - same dir as file, false - sourcemaps places into file
	addPrefixes:  1,   // Use Autoprefixer (1/0). Autoprefixer config in config.css section
	compress:     1    // Compress output CSS (1/0)
};

// SCSS config
config.scss = {
	tasks: {
		compile: "scss",
		clean:   "scss:clean",
		watch:   "scss:watch"
	},
	sourceDir:    "style",
	mainFile:     "main",
	outputStyle:  "compressed", // nested, expanded, compact, compressed
	sourceMapDir: ".",          // "." - same dir as file, false - sourcemaps places into file
	addPrefixes:  1             // Use Autoprefixer (1/0). Autoprefixer config in config.css section
};

// TypeScript config
config.ts = {
	tasks: {
		compile: "ts",
		clean:   "ts:clean",
		watch:   "ts:watch"
	},
	sourceDir:    "script",
	mainFile:     "app",
	treatImports: 0,            // 1 to use webpack bundle which adds additional functions to result file, 0 for use gulp-tsc
	outputStyle:  "compressed", // nested, expanded, compact, compressed (uses only if !treatImports)
	sourceMapDir: "."           // "." - same dir as file, false - sourcemaps places into file (uses only if !treatImports)
};

// Pug config
config.pug = {
	tasks: {
		compile: "pug",
		clean:   "pug:clean",
		watch:   "pug:watch"
	},
	sourceDir:  "tpl",
	fileString: "*.pug", // For any subfolders use **/*.pug
	options:    {} // https://github.com/pugjs/pug#options
};

module.exports = config;