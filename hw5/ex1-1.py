#!/usr/bin/python
#coding=utf-8

from nltk import FreqDist
from nltk.corpus import brown

words = brown.tagged_words(tagset = 'universal')

# 哪些名词常以它们复数形式而不是它们的单数形式出现？（只考虑常规的复数形式，-s 后缀形式的）
nouns = [word.lower() for (word, tag) in words if tag == 'NOUN']
freqNouns = FreqDist(nouns)
for word in freqNouns:
	if freqNouns[word] < freqNouns[word + 's']:
		print word + 's'
