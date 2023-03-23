from nba_api.stats.endpoints import leaguestandingsv3
import pandas as pd

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

url = 'https://stats.nba.com/stats/leaguestandingsv3'

league_standings_data = leaguestandingsv3.LeagueStandingsV3().get_data_frames()[0]


league_standings = league_standings_data[['TeamCity', 'TeamName', 'Conference', 'ConferenceRecord', 'PlayoffRank', 'SeasonID']]


league_standings_dict = league_standings.to_dict()

nba_dict = {}
for index, row in league_standings.iterrows():
    team_city = row['TeamCity']
    team_info = {'Team Name' : row['TeamName'],
                 'Conference': row['Conference'],
                 'Conference Record': row['ConferenceRecord'],
                 'Playoff Rank': row['PlayoffRank'],
                 'Season ID': row['SeasonID'],
    }
    nba_dict[team_city] = team_info
