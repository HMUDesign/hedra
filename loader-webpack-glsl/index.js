const regex_include = /#include (<|")(.+?)("|>)/;

module.exports = function(contents) {
	this.cacheable();

	const imports = [];
	const source = [];

	const parts = contents.split(regex_include);
	while (parts.length) {
		const line = parts.shift();

		if (line.trim()) {
			source.push(JSON.stringify(line));
		}

		if (parts.shift()) {
			let file = parts.shift();
			const delimiter = parts.shift();

			source.push(`import${imports.length}`);

			if (delimiter === '"') {
				file = `./${file}`;
			}
			else {
				file = `shaders/${file}`;
			}

			imports.push(`var import${imports.length} = require("${file}");`);
		}
	}

	return []
		.concat(imports)
		.concat([ '' ])
		.concat([ `module.exports = [${source.join(',')}].join("");` ])
		.join('\n')
		.trim();
};
