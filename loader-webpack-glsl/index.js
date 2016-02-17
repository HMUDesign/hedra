var regex_include = /#include (\<|")(.+?)("|\>)/;

module.exports = function(contents) {
	this.cacheable();
	
	var imports = [];
	var source = [];
	
	var parts = contents.split(regex_include);
	while (parts.length) {
		var line = parts.shift();
		
		if (line.trim()) {
			source.push(JSON.stringify(line));
		}
		
		if (parts.shift()) {
			var file = parts.shift();
			var delimiter = parts.shift();
			
			source.push('import' + imports.length);
			
			if (delimiter === '"') {
				file = './' + file;
			}
			else {
				file = 'shaders/' + file;
			}
			
			imports.push('var import' + imports.length + ' = require("' + file + '");');
		}
	}
	
	source = source.filter(function(line) {
		return line !== '""';
	});
	
	return []
		.concat(imports)
		.concat([ '' ])
		.concat([ 'module.exports = [' + source.join(',') + '].join("");' ])
		.join('\n')
		.trim();
};
