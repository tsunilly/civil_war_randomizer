''' Version 1 of the logic for civil war randomizer 
      - Randomly assigns roles and teams for a list of players
'''

from random import random, shuffle

CORES_NEEDED = 6
SUPPORTS_NEEDED = 4

PLAYERS = [{'name': 'tsunilly', 'ratio': 0.5}, 
    {'name': 'Lomi', 'ratio': 1.0}, 
    {'name': 'Dale', 'ratio': 0.2}, 
    {'name': 'Josh', 'ratio': 1.0}, 
    {'name': 'Space Princess', 'ratio': 0.9}, 
    {'name': 'Le', 'ratio': 0.0}, 
    {'name': 'Joy', 'ratio': 0.7}, 
    {'name': 'Bugs', 'ratio': 0.0}, 
    {'name': 'Cal', 'ratio': 0.0},
    {'name': 'Jonie', 'ratio': 0.5},
    {'name': 'Kebodo', 'ratio': 1.0},
    {'name': 'JK', 'ratio': 0.5},
]

def stuff(players):
    cores, supports = assign_player_roles(players)
    shuffle(cores)
    shuffle(supports)
    teamA = cores[0:3] + supports[0:2]
    teamB = cores[3:] + supports[2:]
    return teamA, teamB


def assign_player_roles(players):
    if len(players) != 10:
        raise Exception('Must have only 10 players')
    core_players, support_players = divide_players_by_roles(players)

    # Make sure all roles can be filled
    if not (len(core_players) >= CORES_NEEDED):
        raise Exception('Not core players! {} found, {} needed'.format(len(core_players), CORES_NEEDED))
    elif not len(support_players) >= SUPPORTS_NEEDED:
        raise Exception('Not enough support players! {} found, {} needed'.format(len(support_players), SUPPORTS_NEEDED))

    # Assign players with fixed roles
    cores = [p for p in core_players if p['ratio'] == 1.0]
    supports = [p for p in support_players if p['ratio'] == 0.0]
    remaining_players = [p for p in players if p not in cores and p not in supports]

    n_cores_needed = CORES_NEEDED - len(cores)
    n_supports_needed = SUPPORTS_NEEDED - len(supports)

    assign_players_rng(remaining_players)
    shuffle(remaining_players)

    for player in remaining_players:
        rngSaysCore = player['rng'] <= player['ratio']
        
        # core preferred
        if rngSaysCore:
            if n_cores_needed > 0:
                cores.append(player)
                n_cores_needed -= 1
            else:
                supports.append(player)
                n_supports_needed -=1
        else: # support preferred
            if n_supports_needed > 0:
                supports.append(player)
                n_supports_needed -=1
            else:
                cores.append(player)
                n_cores_needed -= 1
    return cores, supports

def divide_players_by_roles(players):
    # divide players into roles if they can play on it at any level
    cores = [p for p in players if p['ratio'] > 0.0]
    supports = [p for p in players if p['ratio'] < 1.0]
    return cores, supports

def assign_players_rng(players):
    for p in players:
        p.update({'rng': random()})

if __name__=='__main__':
    print('CIVIL WAR HAS BEEN INITIATED')
    curr_players = PLAYERS
    shuffle(curr_players)
    curr_players = curr_players[:10]
    print('Players: {}'.format(','.join([p['name'] for p in curr_players])))
    print('--Matchup--')
    team1,team2 = stuff(curr_players)
    print('Team 1: {}'.format(','.join([p['name'] for p in team1])))
    print('--Vs--')
    print('Team 2: {}'.format(','.join([p['name'] for p in team2])))
