const fs = require('fs');
const path = require('path');
function fileDisplay(filePath) {
	fs.readdir(filePath, function (err, files) {
		if (err) {
			console.warn(err);
		} else {
			files.forEach(function (filename) {
				var filedir = path.join(filePath, filename);
				fs.stat(filedir, function (eror, stats) {
					if (eror) {
						console.warn('获取文件stats失败');
					} else {
						var isFile = stats.isFile();
						var isDir = stats.isDirectory();
						if (isFile) {
							console.log(filedir);
						}
						if (isDir) {
							fileDisplay(filedir);
						}
					}
				})
			});
		}
	});
}
exports.fileDisplay = fileDisplay;
