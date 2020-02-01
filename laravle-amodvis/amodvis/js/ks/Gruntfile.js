module.exports = function (grunt) {

	var task = grunt.task;

	grunt.initConfig({

		clean: {
			build: {
				src: 'build/*'
			}
		},

		/**
		 * 将src目录中的KISSY文件做编译打包，仅解析合并，源文件不需要指定名称
		 *	KISSY.add(<名称留空>,function(S){});
		 * 	@link https://github.com/daxingplay/grunt-kmc
		 * 	@link http://docs.kissyui.com/1.4/docs/html/guideline/kmc.html
		 */
		kmc: {
			options: {
				comboOnly: false,
				packages: [
					{
					name: 'modules',
					path: './modules',
					charset:'utf-8',
					ignorePackageNameInUri:true
				}
			]
			},
			main: {
				files: [{
					expand: true,
					cwd: './',
					// 仅合并这两个文件
					src: [
					'modules/common_utils/*.js',
					'modules/module_init/*.js',
					'modules/file_upload/upload_zone.js',
					'modules/module_components/*.js',
					],
					dest: 'build/'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-kmc');

	return grunt.registerTask('default', '默认流程', function(type) {
		task.run(['clean:build', 'kmc']);
	});

};

// module.exports = function(grunt) {
// 	grunt.initConfig({
// 		kmc: {
// 			options: {
// 				depFilePath: 'build/mods.js',
// 				comboOnly: false,
// 				fixModuleName:true,
// 				comboMap: true,
// 				packages: [
// 					{
// 						name: 'modules',
// 						path: './',
// 						charset:'utf-8',
// 						ignorePackageNameInUri:true
	
// 					}
// 				],
// 			},
// 			main: {
// 				files: [
// 					{
// 						expand: true,
// 						cwd: './',
// 						src: [ 'modules/module_init/*.js' ],
// 						dest: 'build/'
// 					}
// 				]
// 			}
// 		}
// 	});
// 	grunt.registerTask('default', ['kmc']);
// 	grunt.loadNpmTasks('grunt-kmc');
// };
