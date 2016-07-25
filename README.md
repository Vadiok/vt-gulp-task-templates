# vtGulpScssTemplate

## Usage

* Copy ``./gulp-tasks/*`` to your project.
* Include required packages from the beginning of ``gulp-tasks/{requiredTaskName}.js`` to ``devDependencies`` section of your ``package.json``.
* Edit ``./gulp-tasks/config.js`` config file (if required).
* Copy required strings from ``./gulpfile.js`` to your ``./gulpfile.js``.
* By default task tries to compile ``./source/style/main.scss``.
* Run ``gulp taskName`` to execute some task (task names listed in gulp-tasks/config.js).

---

``./gulp-tasks/config.js`` can be simplified. Any parts of config can be removed. In that case default values will be used in tasks.