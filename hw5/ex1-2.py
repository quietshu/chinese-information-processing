#!/usr/bin/python
#coding=utf-8

from nltk import ConditionalFreqDist
from nltk.corpus import brown

words = brown.tagged_words(tagset = 'universal')

# 哪个词的不同词性标记数目最多？
maximumTagNumber = 0
result = ''
cfd = ConditionalFreqDist((word.lower(), tag) for (word, tag) in words)
for word in cfd.conditions():
    if len(cfd[word]) > maximumTagNumber:
        maximumTagNumber = len(cfd[word])
        result = word + ' (' + ', '.join(tag for (tag, _) in cfd[word].most_common()) + ')'
    elif len(cfd[word]) == maximumTagNumber:
        result += '\n' + word + ' (' + ', '.join(tag for (tag, _) in cfd[word].most_common()) + ')'
print result