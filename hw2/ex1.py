from nltk.corpus import gutenberg

words = gutenberg.words('austen-emma.txt')
print len(words)
print len(set(words))
