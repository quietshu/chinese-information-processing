var jsdom  = require('jsdom');
var fs     = require('fs');
var jquery = require('jquery');

const prefix = 'http://movie.douban.com/subject/';
const path   = __dirname + '/data';

class Item {
    constructor(id) {
        this.id = id;
        this.title = '';
        this.genres = [];
        this.reviewsLink = [];
    }

    init(callback) {
        if (!fs.existsSync(path + '/' + this.id)) {
            jsdom.env(prefix + this.id, (err, window) => {
                if (err) {
                    return callback(err);
                }
                var $ = jquery(window);

                this.title = $('span[property="v:itemreviewed"]').text();
                let genres = $('span[property="v:genre"]');
                let reviews = $('.review-hd > h3 > a ~ a');
                genres.each((index) => {
                    this.genres.push($(genres[index]).text());
                });
                reviews.each((index) => {
                    this.reviewsLink.push($(reviews[index]).attr('href'));
                });
                fs.mkdirSync(path + '/' + this.id);
                fs.writeFileSync(path + '/' + this.id + '/data.json', JSON.stringify(this));
                callback();
            });
        } else {
            var data = JSON.parse(fs.readFileSync(path + '/' + this.id + '/data.json'));
            this.title = data.title;
            this.genres = data.genres;
            this.reviewsLink = data.reviewsLink;
            callback();
        }
    }

    getReviews(progress, callback) {
        var cnt = this.reviewsLink.length;
        this.reviewsLink.forEach((url) => {
            var id = url.match(/\d+/)[0];
            if (!fs.existsSync(path + '/' + this.id + '/' + 'review-' + id + '.txt')) {
                jsdom.env(url, (err, window) => {
                    if (err) {
                        return callback(err);
                    }
                    var $ = jquery(window);

                    var content = $('#link-report').text().trim();// + $('#comments').text().trim();
                    fs.writeFileSync(path + '/' + this.id + '/' + 'review-' + id + '.txt', content);
                    progress(content);
                    if (--cnt == 0) {
                        callback(null);
                    }
                });
            } else {
                progress(fs.readFileSync(path + '/' + this.id + '/' + 'review-' + id + '.txt'));
                if (--cnt == 0) {
                    callback(null);
                }
            }
        });
    }
}

module.exports = Item;
