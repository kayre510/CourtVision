import json

with open('player_stats.json') as f:
    players = json.load(f)


def get_player_stats(player_name):
    for player in players:
        if player['Player'] == player_name:
            stats = {
                'Player': player['Player'],
                'Pos': player['Pos'],
                'Age': player['Age'],
                'Team': player['Tm'],
                'Points per Game': player['PTS'],
                'Rebounds per Game': player['TRB'],
                'Assists per Game': player['AST']
            }
            return stats
    return None

stats = get_player_stats('LeBron James')



def player_comparison(player1_name, player2_name, stat_category):
    player1_stats = None
    player2_stats = None

    for player in players:
        if player['Player'] == player1_name:
            player1_stats = player
        elif player['Player'] == player2_name:
            player2_stats = player

    if player1_stats is None:
        print(f"Could not find stats for {player1_name}")
        return

    if player2_stats is None:
        print(f"Could not find stats for {player2_name}")
        return

    player1_value = float(player1_stats[stat_category])
    player2_value = float(player2_stats[stat_category])

    if player1_value > player2_value:
        return f"{player1_stats['Player']} has better {stat_category} stats than {player2_stats['Player']}"
    elif player1_value < player2_value:
        return f"{player2_stats['Player']} has better {stat_category} stats than {player1_stats['Player']}"
    else:
        return f"{player1_stats['Player']} and {player2_stats['Player']} have the same {stat_category} stats"
