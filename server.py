import requests
from flask import Flask, jsonify,request
import os
import json
from playerfunction import player_comparison
from requests.exceptions import HTTPError
from todays_boxscore import today_games_dict, game_id_list, endpoint
from leaguestandings import nba_dict
from nba_api.stats.static import teams
from nba_api.stats.endpoints import commonteamroster, LeagueLeaders

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

@app.route("/players/<player_name>")
def get_player(player_name):
    for player in players:
        if player["Player"]== player_name:
            return jsonify(player)

#get all of today's boxscores
@app.route("/boxscore")
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

#
