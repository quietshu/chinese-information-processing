text = open("2.txt").readlines()
data = [(lambda x: [x[0], int(x[1])])(line.split(' ')) for line in text]

print data
