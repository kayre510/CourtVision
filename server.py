from flask import Flask, jsonify, request
import os
import json
from playerfunction import player_comparison
from nba_api.stats.static import teams
from nba_api.stats.endpoints import commonteamroster, LeagueLeaders

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
    player1_name = request.args.get('player1_name')
    player2_name = request.args.get('player2_name')
    stat_category = request.args.get('stat_category')

    result = player_comparison(player1_name, player2_name, stat_category)
    return jsonify({'result': result})

@app.route('/roster/<team_name>')
def roster(team_name):
    team_name = team_name.strip('<>')
    team_name = ' '.join(team_name.split('_'))
    for team in teams.get_teams():
        if team['full_name'] == team_name:
            roster = commonteamroster.CommonTeamRoster(team_id=team['id']).get_data_frames()[0]
            players = []
            for _, row in roster.iterrows():
                players.append({'name': row['PLAYER'], 'number': row['NUM'], 'position': row['POSITION']})
            return jsonify({'team': team['full_name'], 'players': players})
    return jsonify({'error': 'Team not found'}), 404


@app.route('/top_ten_players/<season>/<category>')
def get_top_ten_players(season, category):
    season = season.strip('<>')
    league_leaders = LeagueLeaders(season=season, per_mode48="PerGame", stat_category_abbreviation=category)
    top_ten = league_leaders.get_data_frames()[0].head(10)
    return jsonify(top_ten.to_dict(orient='records'))
