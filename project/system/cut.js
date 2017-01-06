var fs = require('fs');
var jieba = require('nodejieba');

var data = fs.readFileSync(__dirname + '/data3.txt');

console.log(jieba.tag(data).filter(function (w) {
	return w.slice(-2) == ':a';
}));

console.log(jieba.extract(data, 20));
