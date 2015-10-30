import random
import sys
from nltk import *

RANDOM_RANGE = 3

text = corpus.genesis.words('english-kjv.txt')
bigrams = bigrams(text)
cfd = ConditionalFreqDist(bigrams)

def generates_next(current, length):
	if length:
		if length > 1:
			sys.stdout.write(current[0] + ' ')
		else:
			sys.stdout.write(current[0] + '.')
		choices = cfd[current[0]].most_common(RANDOM_RANGE)
		if choices:
			generates_next(random.choice(choices), length - 1)

generates_next('a', 50)