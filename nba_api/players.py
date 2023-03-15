from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats



# Find players by first name.
# players.find_players_by_first_name('lebron')
# lebron = players.find_players_by_first_name('lebron')
# print(lebron)

# Nikola Jokić
career = playercareerstats.PlayerCareerStats(player_id='203999')

# pandas data frames (optional: pip install pandas)
career.get_data_frames()[0]

# json
career.get_json()
print(career.get_json())
