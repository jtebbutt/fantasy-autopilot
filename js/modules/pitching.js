// Pitching Analysis Module

import { pitchers, benchPitchers } from '../data/pitchers.js';
import { addPitcherLog, showCompletionBanner } from '../utils/logging.js';
import { updatePitcherRecommendation } from '../utils/ui.js';
import { sleep } from '../utils/helpers.js';

export async function analyzePitchers() {
    addPitcherLog('🔥 Starting OPS-based pitcher analysis...', 'info');
    addPitcherLog('Evaluating opponent team OPS vs pitcher handedness...', 'info');
    
    await sleep(2000);
    
    const analysis = performPitcherAnalysis();
    
    analysis.recommendations.forEach(rec => {
        addPitcherLog(rec.message, rec.type);
    });
    
    await sleep(1500);
    
    // Update UI recommendations
    updatePitcherRecommendations(analysis.updates);
    
    addPitcherLog('✅ Pitcher analysis complete - recommendations updated', 'success');
    showCompletionBanner('🔥 Pitcher Analysis Complete! Start/sit recommendations updated.', 'success');
}

function performPitcherAnalysis() {
    const recommendations = [];
    const updates = [];
    
    Object.entries(pitchers).forEach(([key, pitcher]) => {
        if (pitcher.starting && pitcher.opsVs) {
            const recommendation = evaluatePitcher(pitcher);
            
            if (recommendation.action === 'START') {
                recommendations.push({
                    message: `Strong start recommendation: ${pitcher.name} vs ${pitcher.opponent} (${pitcher.opsVs.toFixed(3)} opponent OPS)`,
                    type: 'success'
                });
            } else if (recommendation.action === 'CONSIDER') {
                recommendations.push({
                    message: `Caution: ${pitcher.name} vs ${pitcher.opponent} (${pitcher.opsVs.toFixed(3)} opponent OPS) - monitor closely`,
                    type: 'warning'
                });
            }
            
            updates.push({
                key: key,
                recommendation: recommendation.action
            });
        }
    });
    
    // Check bench pitchers for better options
    Object.entries(benchPitchers).forEach(([key, pitcher]) => {
        if (pitcher.starting && pitcher.opsVs && pitcher.opsVs < 0.700) {
            recommendations.push({
                message: `Bench recommendation: Consider ${pitcher.name} vs ${pitcher.opponent} (${pitcher.opsVs.toFixed(3)} opponent OPS)`,
                type: 'warning'
            });
        }
    });
    
    return { recommendations, updates };
}

function evaluatePitcher(pitcher) {
    if (!pitcher.opsVs) {
        return { action: 'N/A', confidence: 0 };
    }
    
    if (pitcher.opsVs <= 0.670) {
        return { action: 'START', confidence: 0.9 };
    } else if (pitcher.opsVs <= 0.720) {
        return { action: 'CONSIDER', confidence: 0.6 };
    } else {
        return { action: 'BENCH', confidence: 0.8 };
    }
}

function updatePitcherRecommendations(updates) {
    updates.forEach(update => {
        updatePitcherRecommendation(update.key, update.recommendation);
    });
}

export function getPitcherMatchups() {
    return Object.entries(pitchers)
        .filter(([key, pitcher]) => pitcher.starting)
        .map(([key, pitcher]) => ({
            key,
            name: pitcher.name,
            opponent: pitcher.opponent,
            opsVs: pitcher.opsVs,
            recommendation: evaluatePitcher(pitcher)
        }));
}

export function calculatePitchingScore(pitcherRotation) {
    const startingPitchers = pitcherRotation.filter(p => p.starting && p.opsVs);
    if (startingPitchers.length === 0) return 0;
    
    const averageOpsAgainst = startingPitchers.reduce((sum, p) => sum + p.opsVs, 0) / startingPitchers.length;
    
    // Lower OPS against = higher score
    return Math.max(0, 1.000 - averageOpsAgainst) * 100;
}
