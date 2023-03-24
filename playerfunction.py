
import json
with open('player_stats.json') as f:
    players = json.load(f)


def get_player_stats(player_name):
    for player, values in players.items():
        if player == player_name:
            stats = {
                'Player': player,
                'PTS': values['PTS'],
                'REB': values['REB'],
                'AST': values['AST']
            }
            return stats
    return None

stats = get_player_stats('LeBron James')

print(stats)
def player_comparison(player1_name, player2_name, stat_category):
    player1_stats = None
    player2_stats = None

    for player, value in players.items():
        if player == player1_name:
            player1_stats = get_player_stats(player1_name)
        elif player == player2_name:
            player2_stats = get_player_stats(player2_name)

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

<<<<<<< HEAD
print(player_comparison('Devin Booker', 'Tyrese Haliburton', 'PTS'))
=======
print(player_comparison('Austin Reaves', 'Clint Capela', 'REB'))
>>>>>>> main
