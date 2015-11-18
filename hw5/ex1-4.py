#!/usr/bin/python
#coding=utf-8

from nltk import bigrams
from nltk import FreqDist
from nltk.corpus import brown

words = brown.tagged_words(tagset = 'universal')

# 名词后面最常见的是哪些词性标记？这些标记代表什么？
tags = [b[1] for (a, b) in bigrams(words) if a[1] == 'NOUN']
FreqDist(tags).tabulate()
