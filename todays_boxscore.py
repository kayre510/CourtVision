from nba_api.stats.endpoints import leaguegamefinder
import pandas as pd
from datetime import datetime, timedelta
import json
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

endpoint = 'https://cdn.nba.com/static/json/liveData/boxscore/boxscore'
#todays date:
dt = datetime.now().strftime("%m/%d/%Y")
now = datetime.now()
yesterday = now - timedelta(days=2)
yesterday_str = yesterday.strftime("%m/%d/%Y")
#games played today

gamefinder = leaguegamefinder.LeagueGameFinder(league_id_nullable= '00', season_nullable='2022-23', date_from_nullable=yesterday_str, date_to_nullable=dt, season_type_nullable = 'Regular Season')

games = gamefinder.get_data_frames()[0]


today_games = games[['MATCHUP', 'WL', 'TEAM_NAME','GAME_ID', 'PTS', 'GAME_DATE']]


today_games_dict = today_games.to_dict()

boxscore_dict = {}
winning_teams = set()
losing_teams = set()

for index, row in today_games.iterrows():
    game_id = row['GAME_ID']
    matchup = row['MATCHUP']
    winning_team = row['TEAM_NAME'] if row['WL'] == 'W' else None
    losing_team = row['TEAM_NAME'] if row['WL'] == 'L' else None
    points = row['PTS']

    # Add the game to the dictionary if it doesn't exist yet
    if game_id not in boxscore_dict:
        boxscore_dict[game_id] = {
            'game_id': game_id,
            'game_date': row['GAME_DATE'],
            'matchup': matchup,
            'winning_team': winning_team,
            'losing_team': losing_team,
            'winning_team_points': 0,
            'losing_team_points': 0,
        }

    # Add the points to the appropriate team's total
    if winning_team:
        boxscore_dict[game_id]['winning_team_points'] += points
        boxscore_dict[game_id]['winning_team'] = winning_team # added line to include the winning team's name
        winning_teams.add(winning_team)
    elif losing_team:
        boxscore_dict[game_id]['losing_team_points'] += points
        boxscore_dict[game_id]['losing_team'] = losing_team #
        losing_teams.add(losing_team)

# Convert the winning and losing team sets to lists and add them to the dictionary


print(boxscore_dict)


game_id = today_games_dict['GAME_ID']

game_id_list = []
for i in range(len(game_id)):
    game_id_list.append(game_id[i])
