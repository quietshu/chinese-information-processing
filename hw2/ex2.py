from nltk import *

words = corpus.gutenberg.words('austen-emma.txt')
stops = corpus.stopwords.words('english')
stops.extend(['.', '."', '"', '\'', '!', ',', ';', ',"', '-', '?', '!"', '?"', '`', '.--', '--', 'mr', 'mrs', 'miss'])
stops.extend(['frank', 'emma', 'colonel', 'john', 'jane', 'robert', 'harriet', 'maple', 'knightley'])

excludedStopwords = [w for w in words if w.lower() not in stops]

print list(FreqDist(bigrams(excludedStopwords)).most_common(50))