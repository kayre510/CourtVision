from nba_api.stats.endpoints import leaguestandingsv3
import pandas as pd

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

url = 'https://stats.nba.com/stats/leaguestandingsv3'

league_standings_data = leaguestandingsv3.LeagueStandingsV3().get_data_frames()[0]


league_standings = league_standings_data[['TeamCity', 'TeamName', 'Conference','WinPCT',"HOME","ROAD","L10","CurrentStreak", 'Record', 'PlayoffRank', 'Division']]


league_standings_dict = league_standings.to_dict()

nba_dict = {}
for index, row in league_standings.iterrows():
    team_city = row['TeamCity']
    team_info = {'Team Name' : row['TeamName'],
                 'Conference': row['Conference'],
                 'WinPCT': row['WinPCT'],
                 'HOME': row['HOME'],
                 'ROAD': row['ROAD'],
                 'Record': row['Record'],
                 'L10': row['L10'],
                 'CurrentStreak': row['CurrentStreak'],
                 'Rank': row['PlayoffRank'],
                 'Division': row['Division'],
    }
    nba_dict[team_city] = team_info

