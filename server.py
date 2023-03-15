from flask import Flask, jsonify
from nba_api.stats.static import players
import os

app = Flask(__name__)

origins = [
    "http://localhost:8000",
    os.environ.get("PUBLIC_URL", None),
]

@app.route('/api/players')
def get_players():
    player_list = players.get_players()
    return jsonify(player_list)
