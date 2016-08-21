module.exports = function(grunt) {

	grunt.initConfig({
		jekyll: {
			options: {
				bundleExec: true,
				serve: true,
			},
			dist: {
				options: {
					config: '_config.yml'
				}
			}
		},
		watch: {
			css: {
				files: ['assets/scss/*.scss'],
				tasks: ['compass'],
			}
		},
		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.registerTask('default', ['jekyll','compass']);

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
}
