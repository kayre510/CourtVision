from flask import Flask, jsonify, request
import os
import json
from playerfunction import player_comparison
app = Flask(__name__)

origins = [
    "http://localhost:8000",
    os.environ.get("PUBLIC_URL", None),
]

json_file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'player_stats.json'))

with open(json_file_path) as f:
    players_json = f.read()
    players = json.loads(players_json)

@app.route('/players')
def get_all_players():
    return jsonify(players)

@app.route('/compare-players')
def compare_players():
    # Get player names and stat category from query parameters
    player1_name = request.args.get('player1_name')
    player2_name = request.args.get('player2_name')
    stat_category = request.args.get('stat_category')

    # Call player comparison function with players data from JSON file
    result = player_comparison(player1_name, player2_name, stat_category)

    # Return result as JSON
    return jsonify({'result': result})
