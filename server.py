from flask import Flask, jsonify
import os
import json

app = Flask(__name__)


origins = [
    "http://localhost:8000",
    os.environ.get("PUBLIC_URL", None),
]

json_file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'player_stats.json'))


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
