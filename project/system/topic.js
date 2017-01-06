/**
 * Created by shuding on 11/16/15.
 * <ds303077135@gmail.com>
 */

var fs     = require('fs');
var topics = fs.readdirSync(__dirname + '/topics');
var topic  = {};

topics.forEach(function (file) {
    topic[file.split('.')[0]] = fs.readFileSync(__dirname + '/topics/' + file);
});

class Topic {
    constructor() {
        for (var top in topic) {
            if (topic.hasOwnProperty(top)) {
                this[top] = 0;
            }
        }
    }

    add(item) {
        for (var top in topic) {
            if (topic.hasOwnProperty(top)) {
                if (topic[top].indexOf(item[0]) !== -1) {
                    this[top] += item[1];
                }
            }
        }
    }

    output(progress) {
        for (var top in topic) {
            if (topic.hasOwnProperty(top)) {
                progress(top, this[top]);
            }
        }
    }
}

module.exports = Topic;
