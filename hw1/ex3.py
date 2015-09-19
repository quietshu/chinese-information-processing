from nltk.book import text2

v = set(text2)
endsWithEr = [w for w in v if w.endswith("er")]
containsM = [w for w in v if "m" in w or "M" in w]
containsPh = [w for w in v if "ph" in w or "Ph" in w]
isTitlecase = [w for w in v if w.istitle()]

print(endsWithEr)
print(containsM)
print(containsPh)
print(isTitlecase)

