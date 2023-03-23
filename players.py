from nba_api.stats.endpoints import LeagueLeaders
import pandas as pd

pd.set_option("display.max_columns", None)
pd.set_option("display.max_rows", None)

# Define parameters
season_year = "2022-23"
season_type = "Regular Season"
stat_category = "PTS"

# Get stats
leaders = LeagueLeaders(season=season_year, season_type_all_star=season_type)
data = leaders.get_data_frames()[0]

player_data = data[
    [
        "PLAYER_ID",
        "RANK",
        "PLAYER",
        "GP",
        "FGM",
        "FGA",
        "FG_PCT",
        "FG3M",
        "FG3A",
        "FG3_PCT",
        "FTM",
        "FTA",
        "FT_PCT",
        "OREB",
        "DREB",
        "REB",
        "AST",
        "STL",
        "BLK",
        "TOV",
        "PF",
        "PTS",
    ]
]
player_data_sorted = player_data.sort_values("PLAYER")

player_data_dict = player_data_sorted.to_dict()

player_dict = {}
for index, row in player_data_sorted.iterrows():
    player_name = row["PLAYER"]
    player_info = {
        "id": row["PLAYER_ID"],
        "name": row["PLAYER"],
        "rank": row["RANK"],
        "GP": row["GP"],
        "FGM": row["FGM"],
        "FGA": row["FGA"],
        "FG_PCT": row["FG_PCT"],
        "FG3M": row["FG3M"],
        "FG3A": row["FG3A"],
        "FG3_PCT": row["FG3_PCT"],
        "FTM": row["FTM"],
        "FTA": row["FTA"],
        "FT_PCT": row["FT_PCT"],
        "OREB": row["OREB"],
        "DREB": row["DREB"],
        "REB": row["REB"],
        "AST": row["AST"],
        "STL": row["STL"],
        "BLK": row["BLK"],
        "TOV": row["TOV"],
        "PF": row["PF"],
        "PTS": row["PTS"],
    }
    player_dict[player_name] = player_info