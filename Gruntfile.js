module.exports = function(grunt){
  // Project configuration
  grunt.initConfig({
    connect:{
      server:{
        options:{
          port: 9000,
          open: true,
          livereload: true
        }
      }
    },

    bower_concat: {
      // concatenation of all bower files. 
      all: {
        dest: 'assets/src/js/_bower.js',
        cssDest: 'assets/src/css/_bower.css',
        bowerOptions: {
          relative: false
        },
        // specifying files which don't have a main file by default. 
        mainFiles: {
          'bourbon' : 'bourbon/app/assets/src/css/_bourbon.scss',
          'neat' : 'neat/app/assets/src/css/_neat.scss'
        }
      }
    },
    uglify: {
      js: {
        files: {
          'assets/dist/js/main.min.js': ['assets/src/js/*.js']
        }
      } 
    },
    sass: {                            
      dist: {
       files: [{
         expand: true,
         cwd: 'assets/src/css/sass',
         src: ['*.scss'],
         dest: 'assets/src/css',
         ext: '.css'
       }]
     }
   },
   cssmin: {
    options: {
      sourceMap: true,
      shorthandCompacting: false,
      roundingPrecision: -1
    },
    target: {
     files: [{
       'assets/dist/css/main.min.css': ['assets/src/css/*.css']
     }]
   }     

 },
    // has to be on the min, otherwise sourcemap doesnt work. 
    autoprefixer:{
      main:{
        src: 'assets/src/css/main.css',
      }
    },

    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'assets/src/images/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif,svg}'],   // Actual patterns to match
          dest: 'assets/dist/images'                  // Destination path prefix
        }]
      }
    },

    watch:{
      js:{
        files: ['assets/dist/js/*.js'],
        tasks:['uglify:js'],
        options:{
          livereload: true,
        }
      },
      css:{
        files:['assets/dist/css/*.css'],
        tasks: ['sass:dist', 'cssmin', 'autoprefixer:main'],
        options:{
          livereload: true,
        }
      }
    }



  });


  // This command replaces all the other tasks. 
  require('load-grunt-tasks')(grunt);

  // Default Task
  
  grunt.registerTask('serve',['connect', 'newer:uglify:js', 'bower_concat:all', 'newer:sass:dist', 'newer:autoprefixer', 'newer:cssmin:target',  'newer:imagemin', 'watch']);


};

