module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dev: {
                src: ["src/css/*", "src/js/app/scripts.js", "!src/css/fontawesome.min.css", "!src/css/solid.min.css", "!src/css/webfonts"]
            },
            prod: {
                src: ["build/**"]
            }
        },
        jshint: {
            dev: {
                src: ["src/js/app/*.js", "!src/js/lib/*.js"]
            }
        },
        sass: {
            dev: {
                options: {
                    style: "expanded"
                },
                src: "src/sass/style.scss",
                dest: "src/css/style.css"
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 2 versions']
                },
                src: ["src/css/*.css", "!src/css/webfonts/*.css"]
            }
        },
        concat: {
            options: {
                separator: ";"
            },
            dev: {
                src: ["src/js/app/main.js", "src/js/app/ext/app.js", "src/js/app/ext/lib/ext.js", "!src/js/app/scripts.js"],
                dest: "src/js/app/scripts.js"
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            prod: {
                files: {
                    "build/js/scripts.min.js": "src/js/app/scripts.js"
                }
            }
        },
        cssmin: {
            prod: {
                files: {
                    "build/css/style.min.css": "src/css/style.css"
                }
            }
        },
        imagemin: {
            options: {
                optimizationLevel: 4
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: "src/img/",
                        src: "*",
                        dest: "build/img/"

                    }
                ]
            }
        },
        copy: {
            prod: {
                expand: true,
                cwd: 'src',
                src: ["index.html", "css/fontawesome.min.css", "css/solid.min.css", "css/webfonts/**", "js/lib/**"],
                dest: 'build/',
            }
        },
        replace: {
            prod: {
                src: ["build/index.html"],
                overwrite: true,
                replacements: [
                    {from: 'app/main.js', to: 'scripts.min.js'},
                    {from: 'style.css', to: 'style.min.css'}
                ]
            }
        },
        watch: {
            dev: {
                files: ["src/**/*"],
                tasks: ["dev"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask("dev", ["clean", "jshint", "sass", "autoprefixer"]);
    grunt.registerTask("prod", ["concat", "uglify", "cssmin", "imagemin", "copy", "replace"]);
    grunt.registerTask("default", "dev");
    grunt.registerTask("build", ["dev", "prod"]);

};