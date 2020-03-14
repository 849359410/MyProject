module.exports = {
	outputDir: 'chat_wap_one',
	assetsDir: undefined,
	runtimeCompiler: true,
	productionSourceMap: false,
	filenameHashing: true,
	parallel: undefined,
	css: undefined,
	lintOnSave: true,
	devServer: {
		overlay: {
			warnings: false,
			errors: true
		},
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hotOnly: false,
		proxy: {
			'/wenshao/': {
				target: 'http://192.168.1.35:8080',
				changeOrigin: true
			}
		}
	}
};
