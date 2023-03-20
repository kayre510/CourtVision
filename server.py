from flask import Flask, jsonify
import os
import json
import requests
from requests.exceptions import HTTPError
from todays_boxscore import today_games_dict, game_id_list, endpoint
from leaguestandings import nba_dict
app = Flask(__name__)


origins = [
    "http://localhost:8000",
    os.environ.get("PUBLIC_URL", None),
]

json_file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'player_stats.json'))

@app.route("/")
def home():
    return ("<h1>Welcome to NBA H2H</h1>")

with open(json_file_path) as f:
    players = json.load(f)
@app.route("/players")
def get_all_players():
    return jsonify(players)

@app.route("/player/<player_name>")
def get_player(player_name):
    for player in players:
        if player["Player"].lower() == player_name.lower():
            return jsonify(player)

#get all of today's boxscores
@app.route("/boxscores")
def get_boxscores():
    return jsonify(today_games_dict)

#get a boxscore
@app.route("/boxscore/<game_id>")
def get_boxscore_by_id(game_id=None):
    url=f"{endpoint}_{game_id}.json"
    try:
        response = requests.get(url)
        return response.json()
    except HTTPError or KeyError:
        return({"Message": "Wrong game id"})


#get all league standings
@app.route("/league_standings")
def get_all_league_standings():
    return jsonify(nba_dict)

#get a specific league standing
@app.route("/league_standings/<city>")
def get_league_standing(city):
    try:
        return jsonify(nba_dict[city])
    except KeyError or HTTPError:
        return({"Message": "Enter a city name"})
