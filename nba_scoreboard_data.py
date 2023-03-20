from nba_api.live.nba.endpoints import scoreboard, boxscore
import pandas as pd

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)


score = scoreboard.ScoreBoard()

today_score = score.get_dict()

