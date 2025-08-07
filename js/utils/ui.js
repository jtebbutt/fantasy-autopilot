// UI Utilities

import { getStealScoreClass, formatOPS } from './helpers.js';

export function highlightPlayerSwap(activePlayerKey, benchPlayerKey) {
    const activeRow = document.querySelector(`[data-player="${activePlayerKey}"]`);
    const benchRow = document.querySelector(`[data-player="${benchPlayerKey}"]`);
    
    if (activeRow) activeRow.classList.add('player-swapped');
    if (benchRow) benchRow.classList.add('player-swapped');
    
    setTimeout(() => {
        if (activeRow) activeRow.classList.remove('player-swapped');
        if (benchRow) benchRow.classList.remove('player-swapped');
    }, 2000);
}

export function updateLineupRow(playerKey, playerData) {
    const row = document.querySelector(`[data-player="${playerKey}"]`);
    if (!row) return;

    const spans = row.querySelectorAll('span');
    spans[1].textContent = playerData.name; // Player name
    spans[2].textContent = playerData.team; // Team
    spans[4].textContent = formatOPS(playerData.ops); // OPS
    
    if (playerData.stealScore) {
        spans[5].textContent = playerData.stealScore;
        spans[5].className = `steal-score ${getStealScoreClass(playerData.stealScore)}`;
    }
}

export function updateBenchRow(playerKey, playerData) {
    const row = document.querySelector(`[data-player="${playerKey}"]`);
    if (!row) return;

    const spans = row.querySelectorAll('span');
    spans[0].textContent = playerData.name; // Player name
    spans[1].textContent = `(${playerData.team})`; // Team
    spans[4].textContent = formatOPS(playerData.ops); // OPS
    
    if (playerData.stealScore) {
        spans[5].textContent = playerData.stealScore;
        spans[5].className = `steal-score ${getStealScoreClass(playerData.stealScore)}`;
    }
}

export function updateAnalysisDisplay(analysisData) {
    const analysisElement = document.getElementById('currentAnalysis');
    if (analysisElement) {
        analysisElement.textContent = `• Current lineup average OPS vs today's pitching: ${formatOPS(analysisData.averageOPS)}`;
    }
    
    const analysisDiv = document.querySelector('.autopilot-status');
    const paragraphs = analysisDiv.querySelectorAll('p');
    if (paragraphs.length >= 4) {
        paragraphs[2].textContent = `• Worst current matchup: ${analysisData.worst.name} (${formatOPS(analysisData.worst.ops)} vs ${analysisData.worst.vsHand})`;
        paragraphs[3].textContent = `• Best bench option: ${analysisData.best.name} (${formatOPS(analysisData.best.ops)} vs ${analysisData.best.vsHand})`;
    }
}

export function updatePitcherRecommendation(pitcherKey, recommendation) {
    const recElement = document.getElementById(`${pitcherKey}-rec`);
    if (recElement) {
        recElement.textContent = recommendation;
        recElement.className = `recommendation ${recommendation.toLowerCase()}`;
    }
}

export function highlightStealScores() {
    const stealScores = document.querySelectorAll('.steal-score.good');
    stealScores.forEach(score => {
        score.style.animation = 'pulse 1s ease-in-out 3';
    });
}

export function initializeStealScoreClasses() {
    const stealScores = document.querySelectorAll('.steal-score');
    stealScores.forEach(score => {
        const value = parseInt(score.textContent);
        if (value) {
            score.className = `steal-score ${getStealScoreClass(value)}`;
        }
    });
}
