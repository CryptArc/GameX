from sys import argv

score = argv[1]
lines = open("game.min.js","r").readlines()
lines[4140] = "\t\t\tscore: {},\n".format(score)

with open("game.min.js","w") as f:
	f.writelines(lines)
