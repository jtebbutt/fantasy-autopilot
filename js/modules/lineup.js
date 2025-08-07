// Lineup Management Module

import { lineupPlayers, benchPlayers } from '../data/players.js';
import { calculateAverageOPS, findWorstPlayer, findBestPlayer } from '../utils/helpers.js';
import { updateLineupRow, updateBenchRow, updateAnalysisDisplay, highlightPlayerSwap } from '../utils/ui.js';

export function swapPlayers(activePlayerKey, benchPlayerKey) {
    const activePlayer = lineupPlayers[activePlayerKey];
    const benchPlayer = benchPlayers[benchPlayerKey];
    
    if (!activePlayer || !benchPlayer) {
        console.error('Player not found for swap');
        return false;
    }
    
    // Swap data
    lineupPlayers[activePlayerKey] = { ...benchPlayer, status: 'active' };
    benchPlayers[benchPlayerKey] = { ...activePlayer, status: 'bench' };
    
    // Update UI
    highlightPlayerSwap(activePlayerKey, benchPlayerKey);
    updateLineupDisplay();
    
    return true;
}

export function updateLineupDisplay() {
    // Update lineup rows
    Object.keys(lineupPlayers).forEach(key => {
        updateLineupRow(key, lineupPlayers[key]);
    });

    // Update bench rows
    Object.keys(benchPlayers).forEach(key => {
        updateBenchRow(key, benchPlayers[key]);
    });

    // Update analysis
    updateAnalysis();
}

export function updateAnalysis() {
    const averageOPS = calculateAverageOPS(lineupPlayers);
    const worstPlayer = findWorstPlayer(lineupPlayers);
    const bestBenchPlayer = findBestPlayer(benchPlayers);
    
    updateAnalysisDisplay({
        averageOPS,
        worst: worstPlayer,
        best: bestBenchPlayer
    });
}

export function findOptimalSwap() {
    const worstActive = findWorstPlayer(lineupPlayers);
    const bestBench = findBestPlayer(benchPlayers);
    
    // Find the keys for these players
    const worstActiveKey = Object.keys(lineupPlayers).find(key => 
        lineupPlayers[key] === worstActive
    );
    const bestBenchKey = Object.keys(benchPlayers).find(key => 
        benchPlayers[key] === bestBench
    );
    
    if (bestBench.ops > worstActive.ops) {
        return {
            activeKey: worstActiveKey,
            benchKey: bestBenchKey,
            improvement: bestBench.ops - worstActive.ops
        };
    }
    
    return null;
}

export function getLineupStats() {
    return {
        averageOPS: calculateAverageOPS(lineupPlayers),
        totalPlayers: Object.keys(lineupPlayers).length,
        playersWithStealScore: Object.values(lineupPlayers).filter(p => p.stealScore).length
    };
}
