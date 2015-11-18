#!/usr/bin/python
#coding=utf-8

from nltk import DefaultTagger
from nltk import FreqDist
from nltk import ConditionalFreqDist
from nltk import UnigramTagger
from nltk.corpus import brown
import pylab

words = brown.tagged_words(categories = 'news')

fd = list(FreqDist(words))
cfd = ConditionalFreqDist(words)
taggedSents = brown.tagged_sents(categories = 'news')

def performance(wordList):
	tagger = dict((word[0], cfd[word[0]].max()) for (word, freq) in wordList if len(cfd[word[0]]))
	if not len(tagger):
		return 0
	baselineTagger = UnigramTagger(model = tagger, backoff = DefaultTagger('NN'))
	return baselineTagger.evaluate(taggedSents)

sizes = 2 ** pylab.arange(10)
perfs = [performance(fd[:size]) for size in sizes]
pylab.plot(sizes, perfs, '-bo')
pylab.show()
