// Ported script.py
// Assigns roles and randomizes a role-balanced team

import { shuffle } from './util/shuffle';

const CORES_NEEDED = 6;
const SUPPORTS_NEEDED = 4;

function assignPlayerRoles(players) {
    if (players.length !== 10) {
        throw new Error('Must have only 10 players');
    }

    const [corePlayers, supportPlayers] = dividePlayersByRoles(players);

    // Make sure all roles can be filled
    if (!corePlayers.length >= CORES_NEEDED) {
        throw new Error(`Not core players! ${corePlayers} found, ${CORES_NEEDED} needed`);
    } else if (!supportPlayers.length >= SUPPORTS_NEEDED) {
        throw new Error(`Not enough support players! ${supportPlayers} found, ${SUPPORTS_NEEDED} needed`);
    }

    // Assign players with fixed roles
    const cores = corePlayers.filter(p => p.ratio === 1.0);
    const supports = supportPlayers.filter(p => p.ratio === 0.0);
    const remainingPlayers = players.filter(p => !cores.some(cp => cp.name === p.name) && !supports.some(sp => sp.name === p.name)); 

    let nCoresNeeded = CORES_NEEDED - cores.length;
    let nSupportsNeeded = SUPPORTS_NEEDED - supports.length;

    assignPlayersRng(remainingPlayers);
    shuffle(remainingPlayers);

    remainingPlayers.forEach((player, i) => {
        let rngSaysCore = player['rng'] <= player['ratio'];

        // core preferred
        if (rngSaysCore) {
            if (nCoresNeeded > 0) {
                cores.push(player);
                nCoresNeeded--;
            } else {
                supports.push(player);
                nSupportsNeeded--;
            }
        } else { // support preferred
            if (nSupportsNeeded > 0) {
                supports.push(player);
                nSupportsNeeded--;
            } else {
                cores.push(player);
                nCoresNeeded--;
            }
        }
    })
    return [cores, supports]
}

function dividePlayersByRoles(players) {
    // divide players into roles if they can play on it at any level
    const cores = players.filter(p => p.ratio > 0.0);
    const supports = players.filter(p => p.ratio < 1.0);
    return [cores, supports]
}
 
function assignPlayersRng(players) {
    players.forEach((p, i) => {
        players[i].rng = Math.random();
    });
}

export function randomize(players) {
    const [cores, supports] = assignPlayerRoles(players);
    shuffle(cores);
    shuffle(supports);
    const teamA = cores.slice(0, 3).concat(supports.slice(0, 2));
    const teamB = cores.slice(3).concat(supports.slice(2));
    return [teamA, teamB];
}