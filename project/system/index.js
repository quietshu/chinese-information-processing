/**
 * Created by shuding on 11/15/15.
 * <ds303077135@gmail.com>
 */

var Topic    = require('./topic');
var Item     = require('./spider');
var Analyser = require('./analyser');

var it       = new Item('1292064');
var topic    = new Topic();
var analyser = new Analyser();

const MIN = 1000;

it.init((err) => {
    if (err) {
        return err;
    }

    it.getReviews((content) => {
        analyser.add(content);
    }, (err) => {
        if (err) {
            return err;
        }

        console.log(it.title);
        analyser.getAll(5, (tag, wordScore) => {
            //console.log(tag, wordScore);
        }, () => {
            console.log('Music: ');
            console.log(analyser.getMusicEvaluates());
            console.log('Picture: ');
            console.log(analyser.getPictureEvaluates());
            console.log('Drama: ');
            console.log(analyser.getDramaEvaluates());
            console.log(analyser.getVerb(MIN));
            console.log(analyser.getAdj(MIN));
            console.log(analyser.getNoun(MIN));
            console.log(analyser.getI(MIN));
        });

        /*
         arr.forEach(function (item) {
         topic.add(item);
         });
         topic.output(function (topic, score) {
         console.log(topic + (new Array(20 - topic.length).join(' ')) + score.toFixed(3));
         });
         */
    });
});
