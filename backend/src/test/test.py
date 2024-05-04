import sys

login=sys.argv[1]
password=sys.argv[2]
streamers = sys.argv[3].split(',')
token = sys.argv[4]

print("Login: ", login, " Password: ", password, " Token: ", token)

for i in range(len(streamers)):
		print("Streamer: ", streamers[i])

sys.exit(0)