const path = require('path');
const fs = require('fs');

const webpackConfigs = {
	production: 'react-scripts/config/webpack.config.prod.js',
	development: 'react-scripts/config/webpack.config.dev.js',
};

// webpack config
setImmediate(() => {
	if (webpackConfigs[process.env.NODE_ENV]) {
		const config = require(webpackConfigs[process.env.NODE_ENV]);

		config.resolve.symlinks = false;

		// remove service worker
		for (let i = 0; i < config.plugins.length; i++) {
			if (config.plugins[i].constructor.name !== 'GenerateSW') {
				continue;
			}

			config.plugins.splice(i--, 1);
		}

		// add glsl loader
		// const rules = config.module.rules[2].oneOf;
		// rules.splice(rules.length - 1, 0, {
		// 	test: /\.glsl/,
		// 	use: path.join(__dirname, 'loader-webpack-glsl'),
		// });

		// add babel support to other files
		const rule = config.module.rules[2].oneOf[1];
		rule.include = [
			rule.include,
			path.join(__dirname, 'node_modules', '@hmudesign', 'hedra'),
		];
	}
});

// force output directory to exist
{
	const directory = path.join(__dirname, 'build');
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory);
	}

	fs.writeFileSync(path.join(directory, '.hold'), '');
}
