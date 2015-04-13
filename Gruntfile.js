/*
 *	    ____  ____  _____   ____________
 *	   / __ \/ __ \/  _/ | / /_  __/ __ \
 *	  / /_/ / /_/ // //  |/ / / / / /_/ /
 *	 / ____/ _, _// // /|  / / / / _, _/
 *	/_/   /_/ |_/___/_/ |_/ /_/ /_/ |_|
 *
 *	Copyright Printr B.V. All rights reserved.
 *	This code is closed source and should under
 *	no circumstances be copied or used in other
 *	applications that for Printr B.V.
 *
 */

module.exports = function(grunt) {
	window = {};

	require("./app/config/environment.js");

	var json = {
		/*
		 *	Clean folders before copying.
		 */
		clean: {
		  assets: ["./public/assets/javascripts/*", "./public/assets/stylesheets/*"],
		  config: ["./public/config.js"]
		},

		concat: {
			options: {
				separator: ';\n'
			},
			files: {
				src: [

					/*
					 *	Include configs
					 */
					'./app/config/helpers.js',
					'./app/config/environment.js',
					'./app/config/auth.js',
					'./app/config/path.js',
					'./app/config/include.js',
					'./app/config/debug.js',

					/*
					 *	Angular and its main dependencies.
					 */
					'./bower_components/angular/angular.js',
					'./bower_components/angular-resource/angular-resource.js',
					'./bower_components/angular-animate/angular-animate.js',
					'./bower_components/angular-sanitize/angular-sanitize.js',

					/*
					 *	Angular vendor dependencies.
					 */
					'./bower_components/angular-ui-codemirror/ui-codemirror.js',
					'./bower_components/angular-hotkeys/build/hotkeys.js',
					'./bower_components/ng-tags-input/ng-tags-input.js',

					/*
					 *	Load modules.
					 */
					'./app/modules/angular.js',
					'./app/modules/vendor.js',
					'./app/modules/filters.js',
					'./app/modules/services.js',
					'./app/modules/core.js',

					/*
					 *	Include source files 
					 */
					'./app/dependencies/**/*.js',
					'./app/filters/**/*.js',
					'./app/services/**/*.js',
					'./app/directives/**/*.js',

					/*
					 *	Include main files
					 */
					'./bower_components/codemirror/lib/codemirror.js',
					'./bower_components/codemirror/mode/javascript/javascript.js',

					'./app/app.js',
					'./app/controllers/**/*.js'
				],
				dest: './public/assets/javascripts/application.js'
			}
		},

		/*
		 * Uglify Javascript files
		 */
		uglify: {
			options: {
				mangle: true  // Use if you want the names of your functions and variables unchanged
			},
			main: {
				files: {
					'./public/assets/javascripts/application.js': './public/assets/javascripts/application.js'
				}
			}
		},

		/*
		 * Initialise Compass SASS
		 */
		compass: {
			dist: {
				options: {
					config: './compass.rb',
					environment: window.ENV.type
				}
			}
		},

		/*
		 * Watch for changes in directories
		 */
		watch: {
			javascripts: {
				files: ['./public/tmp/**/*.js', './app/**/*.js'],
				tasks: ['js:' + ((window.ENV.type == 'development') ? 'dev' : 'dist')]
			},
			sass: {
				files: ['./sass/**/*.scss', './css-base/dist/**/*.scss'],
				tasks: ['compass']
			}
		},

		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				updateConfigs: [],
				commit: true,
				commitMessage: 'Release %VERSION%',
				commitFiles: ['package.json', 'bower.json'],
				createTag: true,
				tagName: '%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'origin',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				prereleaseName: false,
				regExp: false
			}
		}
	}

	grunt.initConfig();
	grunt.config.merge(json);

	/*
	 * Load NPM Plugins
	 */
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-bump');

	/*
	 * Register Tasks
	 */
	grunt.registerTask('build:config', ['clean:config']);

	grunt.registerTask('js:dist', ['build:config', 'concat:', 'uglify']);
	grunt.registerTask('js:dev', ['build:config', 'concat']);

  	grunt.registerTask('default', ['clean:assets', 'compass', 'js:' + ((window.ENV.type == 'development') ? 'dev' : 'dist'), 'compass']);

};
