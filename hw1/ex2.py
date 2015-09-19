from nltk.book import text5
from nltk.probability import FreqDist

v = set(text5)
startsWithT = [w for w in v if w.startswith("t") or w.startswith("T")]
print(sorted(startsWithT))

lengthIs5 = [w for w in text5 if len(w) == 5]
fdist = FreqDist(lengthIs5)
fdist.plot(50)
