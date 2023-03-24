# from nba_api.stats.static import teams
# from nba_api.stats.endpoints import TeamLogo

# # Get the team ID for a specific team
# team_name = 'Los Angeles Lakers'
# team = teams.find_team_by_full_name(team_name)
# team_id = team['id']

# # Get the team logo URL
# team_logo = TeamLogo(team_id=team_id)
# team_logo_url = team_logo.get_normalized_dict()['TeamLogo'][0]['url']
# print(team_logo_url)

import os
import json

photos = "C:/Users/b_mat/Desktop/nba-app/nba_player_headshots"

for files in os.listdir(photos):
    print(files)
