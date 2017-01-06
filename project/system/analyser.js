/**
 * Created by shuding on 11/17/15.
 * <ds303077135@gmail.com>
 */

var fs    = require('fs');
var jieba = require('nodejieba');

var excluded         = readin('excluded_words.txt').split('\n');
var picture_keywords = readin('score/picture_keywords.txt').split('\n');
var music_keywords   = readin('score/music_keywords.txt').split('\n');
var drama_keywords   = readin('score/drama_keywords.txt').split('\n');
const tagScope       = ['a', 'i', 'nz', 'l', 'j', 'z', 'an', 'n'];

function readin(file) {
    return fs.readFileSync(__dirname + '/' + file) + '';
}

function each(obj, fn) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            fn(prop, obj[prop]);
        }
    }
}

class Analyser {
    constructor(wordCnt, min) {
        this.count = wordCnt || 1000;
        this.min   = min || 0;
        this.words = {};
        this.ranks = {};

        this.picture = [];
        this.music   = [];
        this.drama   = [];
    }

    add(content) {
        // Extract keywords
        var sents = (content + '').split(/[.,?!"”“:;，。：；「」？！【】『』…]+/);
        sents.forEach((sent) => {
            var words = jieba.extract(sent, this.count);

            var tags    = [], picture_sent;
            var picture = false, music = false, drama = false;

            words.forEach((word) => {
                word  = word.split(':');
                var w = word[0], s = parseFloat(word[1]);
                if (excluded.indexOf(w) != -1) {
                    return;
                }

                var withTag = jieba.tag(w)[0].split(':');
                var t       = withTag[1];

                // Picture
                if (!picture && picture_keywords.indexOf(w) !== -1) {
                    picture      = true;
                    picture_sent = sent;
                }
                // Music
                if (!music && music_keywords.indexOf(w) !== -1) {
                    music = true;
                }
                // Drama
                if (!drama && drama_keywords.indexOf(w) !== -1) {
                    drama = true;
                }
                if (tagScope.indexOf(t) !== -1) {
                    tags.push(withTag);
                }

                if (!this.words[t]) {
                    this.words[t] = {};
                }

                if (s > this.min) {
                    if (!this.words[t][w]) {
                        this.words[t][w] = s;
                    } else {
                        this.words[t][w] *= s;
                    }
                }
            });

            if (picture && tags.length) {
                this.picture = this.picture.concat(tags);
            }
            if (music && tags.length) {
                this.music = this.music.concat(tags);
            }
            if (drama && tags.length) {
                this.drama = this.drama.concat(tags);
            }
        });
    }

    getAll(top, progress, callback) {
        top = top || 5;
        each(this.words, (t, words) => {
            let arr       = [];
            each(words, (w, s) => {
                if (arr.length < top) {
                    arr.push({
                        word:  w,
                        score: s
                    });
                } else {
                    let index = -1;
                    for (let i = 0; i < top; ++i) {
                        if (arr[i].score < s) {
                            index = i;
                            break;
                        }
                    }
                    if (index !== -1) {
                        for (let i = top - 1; i > index; --i) {
                            arr[i] = arr[i - 1];
                        }
                        arr[index] = {
                            word:  w,
                            score: s
                        };
                    }
                }
            });
            this.ranks[t] = arr;
            progress && progress(t, arr);
        });
        callback && callback();
    }

    getData(tag, f) {
        if (f) {
            return this.ranks[tag].filter((data) => {
                return data.score >= f;
            });
        } else {
            return this.ranks[tag];
        }
    }

    getNoun(f) {
        return this.getData('n', f);
    }

    getAdj(f) {
        return this.getData('a', f);
    }

    getVerb(f) {
        return this.getData('v', f);
    }

    getI(f) {
        return this.getData('i', f);
    }

    getDate(f) {
        return this.getData('m', f);
    }

    getAddr(f) {
        return this.getData('ns', f);
    }

    getPictureEvaluates() {
        return this.picture;
    }

    getMusicEvaluates() {
        return this.music;
    }

    getDramaEvaluates() {
        return this.drama;
    }
}

module.exports = Analyser;
