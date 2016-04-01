//gruntfile.js文件内容
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        transport: {
            options: {
                paths: ['js'], // where is the module, default value is ['sea-modules']
                alias:'<%= pkg.spm.alias %>'
            },
            helloworld: {
                options: {
                    idleading: 'helloworld/'
                },
                files: [
                    {
                        cwd: 'js/helloworld',
                        src: '**/*.js',
                        dest: '.build/helloworld'
                    }
                ]
            },
            main: {
                options: {
                    idleading: 'main/'
                },
                files: [
                    {
                        cwd: 'js/main',
                        src: '**/*.js',
                        dest: '.build/main'
                    }
                ]
            },
            lib: {
                options: {
                    idleading: 'lib/'
                },
                files: [
                    {
                        cwd: 'js/lib',
                        src: '**/*.js',
                        dest: '.build/lib'
                    }
                ]
            }
        },
        concat: {
            options: {
                include: 'relative'
            },
            build: {
                files: {
                    'dist/helloworld/klass.js': ['.build/helloworld/klass.js', '.build/helloworld/circle.js'],
                    'dist/main/index.js': ['.build/main/index.js'],
                    'dist/lib/jquery-debug.js':['.build/lib/jquery-debug.js']
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'dist/helloworld/klass.js': ['dist/helloworld/klass.js'],
                    'dist/main/index.js': ['dist/main/index.js'],
                    'dist/lib/jquery-debug.js':['dist/lib/jquery-debug.js']
                }
            }
        },
        clean:  {
            build: ['.build'] // clean .build directory
        }
    });
    grunt.loadNpmTasks('grunt-cmd-transport');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask("test","my custom task",function(){
        console.log("hello grunt");
    });
    grunt.registerTask('default', ['transport', /*'concat',*/ 'uglify', 'clean','test']);
};