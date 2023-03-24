import requests, os
import json

with open('C:/Users/b_mat/Desktop/nba-app/nba-app/player_id.json') as f:
    players = json.load(f)


lst_id = []
lst_name = []
nba_d = {}
for player, id in players.items():
    lst_id.append(id)
    lst_name.append(player)
    nba_d[player] = id


def getHeadshotById(id, folder=None, fileName=None):

    if not fileName:
        fileName = str(id) + ".png"

    if not folder:
        folder = ""

    url = f"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + str(id) +".png"

    if not os.path.isdir(folder) and folder != "":
        os.mkdir(folder)

    r = requests.get(url, allow_redirects=True)
    if r.ok:
        open(folder + fileName, 'wb').write(r.content)
    else:
        print("Error: Not a valid id. Please specify a valid id.")


lst = []
def getAllHeadshots(folder):
    for name, id in nba_d.items():
        fileName = name + ".png"
        getHeadshotById(id, folder, fileName)


getAllHeadshots("saveHere/")
