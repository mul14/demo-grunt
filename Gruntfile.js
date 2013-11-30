module.exports = function(grunt) {

    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      favicons: {
        options: {
          html: 'favicon.html',
          trueColor: true,
        },
        icons: {
          src: 'assets/favicons/logo.png',
          dest: 'public/favicons'
        }
      },
      less: {
        options: { compress: true },
        default: {
            dest: "tmp/style.css",
            src: ["assets/less/main.less"]
        }
      },
      concat: {
        css: {
            dest: "tmp/concat.css",
            src: [
                "assets/css/normalize.css",
                "tmp/*.css",
            ]
        },
        js: {
            dest: "tmp/concat.js",
            src: [ "assets/js/libs/jquery*.js", "assets/js/*.js" ]
        }
      },
      cssmin: {
        options: { keepSpecialComments: 0 },
        default: {
            files: { "public/css/style.min.css": "tmp/concat.css" }
        }
      },
      uglify: {
        default: {
            files: { "public/js/script.min.js": "tmp/concat.js"  }
        }
      },
      compress: {
        default: {
            options: {
                archive: "deploy/<%= pkg.name %>-<%= grunt.template.today('yyyy-mm-dd') %>.zip"
            },
            expand: true,
            cwd: "public",
            dest: "<%= pkg.name %>",
            src: ["**"]
        }
      },
      image_resize: {
        default: {
            options: { width: 350 },
            files: [
                { "tmp/img/niagara.jpg": "assets/img/niagara.jpg" },
                { "tmp/img/niagara-falls.jpg": "assets/img/niagara-falls.jpg" }
            ]
        }
      },
      imagemin: {
        default: {
            expand: true,
            cwd: "tmp/img",
            dest: "public/img",
            src: "*.{jpg,png,gif}"
        }
      },
      clean: ["tmp", "public"]
    })

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-favicons');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-image-resize');

    // Register the task
    grunt.registerTask('default', ['clean', 'favicons', 'less', 'concat', 'cssmin', 'uglify', 'image_resize', 'imagemin', 'compress']);
}
