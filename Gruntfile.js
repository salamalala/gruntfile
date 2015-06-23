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
    responsive_images: {
      myTask: {
        options: {
          sizes: [{
            width: 320,
          },{
            name: 'large',
            width: 640
          },{
            name: "large",
            width: 1024,
            suffix: "_x2",
            quality: 60
          }]
        },
        files: [{
          expand: true,
          cwd: 'assets/src/images',
          src: ['**/*.{jpg,gif,png}'],
          dest: 'assets/dist/images'
        }]
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
          'assets/dist/**/*.css',
          '*.php'
          ]
        },
        options: {
          proxy: "http://localhost/wordpress",
          watchTask: true,
        }
      }
    },
    watch:{
      js:{
        files: ['assets/src/js/*.js'],
        tasks:['uglify:js'],
        // options:{
        //   livereload: true,
        // }
      },
      sass:{
        files:['**/*.scss'],
        tasks: ['sass:dist', 'autoprefixer:main', 'cssmin:target'],
        // options:{
        //   livereload: true,
        // }
      },
      images:{
        files:['assets/src/images/*.{jpg,gif,png}'],
        tasks: ['imagemin', 'responsive_images'],
        // options:{
        //   livereload: true,
        // }
      }
    }



  });


  // This command replaces all the other tasks. 
  require('load-grunt-tasks')(grunt);

  // Default Task
  
  grunt.registerTask('default',['newer:uglify:js', 'bower_concat:all', 'newer:sass:dist','newer:autoprefixer', 'cssmin:target',  'newer:imagemin', 'browserSync', 'watch']);




};

