#!/usr/bin/python
#coding=utf-8

from nltk import FreqDist
from nltk.corpus import brown

words = brown.tagged_words(tagset = 'universal')

# 按频率递减的顺序列出标记，前20个最频繁的词性标记代表什么？
freqTags = FreqDist(tag for (word, tag) in words)
print freqTags.most_common(20)