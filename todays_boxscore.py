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
yesterday = now - timedelta(days=1)
yesterday_str = yesterday.strftime("%m/%d/%Y")
print(yesterday_str)
#games played today

gamefinder = leaguegamefinder.LeagueGameFinder(league_id_nullable= '00', season_nullable='2022-23', date_from_nullable=yesterday_str, date_to_nullable=dt, season_type_nullable = 'Regular Season')

games = gamefinder.get_data_frames()[0]


today_games = games[['MATCHUP', 'WL', 'TEAM_NAME','GAME_ID', 'PTS', 'GAME_DATE']]


today_games_dict = today_games.to_dict()

nba_abbreviation_dict = {
  "Atlanta Hawks": "ATL",
  "Boston Celtics": "BOS",
  "Brooklyn Nets": "BKN",
  "Charlotte Hornets": "CHA",
  "Chicago Bulls": "CHI",
  "Cleveland Cavaliers": "CLE",
  "Dallas Mavericks": "DAL",
  "Denver Nuggets": "DEN",
  "Detroit Pistons": "DET",
  "Golden State Warriors": "GSW",
  "Houston Rockets": "HOU",
  "Indiana Pacers": "IND",
  "LA Clippers": "LAC",
  "Los Angeles Lakers": "LAL",
  "Memphis Grizzlies": "MEM",
  "Miami Heat": "MIA",
  "Milwaukee Bucks": "MIL",
  "Minnesota Timberwolves": "MIN",
  "New Orleans Pelicans": "NOP",
  "New York Knicks": "NYK",
  "Oklahoma City Thunder": "OKC",
  "Orlando Magic": "ORL",
  "Philadelphia 76ers": "PHI",
  "Phoenix Suns": "PHX",
  "Portland Trail Blazers": "POR",
  "Sacramento Kings": "SAC",
  "San Antonio Spurs": "SAS",
  "Toronto Raptors": "TOR",
  "Utah Jazz": "UTA",
  "Washington Wizards": "WAS"
}

boxscore_dict = {}
winning_teams = set()
losing_teams = set()

for index, row in today_games.iterrows():
    game_id = row['GAME_ID']
    matchup = row['MATCHUP']
    winning_team = row['TEAM_NAME'] if row['WL'] == 'W' else None
    winning_team_abb = matchup[0:3].upper()
    losing_team = row['TEAM_NAME'] if row['WL'] == 'L' else None
    losing_team_abb = losing_team[0:3].upper() if losing_team else None
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
        boxscore_dict[game_id]['winning_team'] = winning_team
         # Add the key:value pair for winning team abbreviation

    elif losing_team:
        boxscore_dict[game_id]['losing_team_points'] += points
        boxscore_dict[game_id]['losing_team'] = losing_team
          # Add the key:value pair for losing team abbreviation

# Convert the winning and losing team sets to lists and add them to the dictionary
def append_abbreviations(boxscore_dict, nba_abbreviation_dict):
    updated_dict = {}
    for gameid, gamedata in boxscore_dict.items():
        winning_team = gamedata['winning_team']
        losing_team = gamedata['losing_team']
        updated_gamedata = gamedata.copy()
        for team, abbrev in nba_abbreviation_dict.items():
            if winning_team == team:
                updated_gamedata['winning_team_abbrev'] = abbrev
            if losing_team == team:
                updated_gamedata['losing_team_abbrev'] = abbrev
        updated_dict[gameid] = updated_gamedata
    boxscore_dict.update(updated_dict)
    return boxscore_dict
d_with_abbreviations = append_abbreviations(boxscore_dict, nba_abbreviation_dict)

print(d_with_abbreviations)
game_id = today_games_dict['GAME_ID']

game_id_list = []
for i in range(len(game_id)):
    game_id_list.append(game_id[i])
