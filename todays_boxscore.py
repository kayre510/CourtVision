from nba_api.stats.endpoints import leaguegamefinder
import pandas as pd
import datetime
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

endpoint = 'https://cdn.nba.com/static/json/liveData/boxscore/boxscore'
#todays date:
dt = datetime.datetime.now().strftime("%m/%d/%Y")

#games played today

gamefinder = leaguegamefinder.LeagueGameFinder(league_id_nullable= '00', season_nullable='2022-23', date_from_nullable='03/16/2023', date_to_nullable=dt, season_type_nullable = 'Regular Season')

games = gamefinder.get_data_frames()[0]


today_games = games[['MATCHUP', 'WL', 'TEAM_NAME','GAME_ID', 'PTS']]

today_games_dict = today_games.to_dict()


game_id = today_games_dict['GAME_ID']

game_id_list = []
for i in range(len(game_id)):
    game_id_list.append(game_id[i])
