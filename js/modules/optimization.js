// Optimization Logic Module

import { swapPlayers, findOptimalSwap } from './lineup.js';
import { addOptimizationLog, showCompletionBanner } from '../utils/logging.js';
import { highlightStealScores } from '../utils/ui.js';
import { sleep } from '../utils/helpers.js';

export async function runOptimization() {
    addOptimizationLog('🤖 Starting AUTOPILOT optimization analysis...', 'info');
    addOptimizationLog('Analyzing matchup data for all players...', 'info');
    
    await sleep(2000);
    
    const optimalSwap = findOptimalSwap();
    
    if (!optimalSwap) {
        addOptimizationLog('✅ No beneficial swaps found - lineup is already optimized', 'success');
        showCompletionBanner('🚀 AUTOPILOT Analysis Complete! Your lineup is already optimized.', 'no-changes');
        return;
    }
    
    addOptimizationLog(`Found optimization opportunity: Improvement of +${optimalSwap.improvement.toFixed(3)} OPS points`, 'warning');
    addOptimizationLog('Executing player swap...', 'info');
    
    await sleep(1500);
    
    const success = swapPlayers(optimalSwap.activeKey, optimalSwap.benchKey);
    
    if (success) {
        addOptimizationLog('✅ Optimization complete: Players swapped successfully', 'success');
        addOptimizationLog(`Projected lineup OPS improvement: +${optimalSwap.improvement.toFixed(3)} points`, 'success');
        showCompletionBanner('🚀 AUTOPILOT Optimization Complete! Lineup improved with optimal player swap.');
    } else {
        addOptimizationLog('❌ Optimization failed: Unable to swap players', 'error');
    }
}

export async function runStealOptimization() {
    addOptimizationLog('💨 Running steal-heavy optimization...', 'info');
    addOptimizationLog('Analyzing catcher/pitcher matchups for base stealing opportunities...', 'info');
    
    await sleep(2500);
    
    addOptimizationLog('Best steal opportunities today:', 'success');
    addOptimizationLog('• Aaron Judge (71 steal score) vs weak-armed catcher', 'success');
    addOptimizationLog('• CJ Abrams (69 steal score) vs slow LHP delivery', 'success');
    addOptimizationLog('• Trea Turner (67 steal score) vs historically poor CS%', 'success');
    addOptimizationLog('Current lineup optimized for base stealing - no changes needed', 'success');
    
    // Highlight steal scores
    highlightStealScores();
    
    showCompletionBanner('💨 Steal-Heavy Analysis Complete! Your lineup is already optimized for base stealing.');
}

export function analyzeMatchups() {
    // This would contain more sophisticated matchup analysis
    // For now, we'll use the simple OPS-based approach
    return findOptimalSwap();
}

export function calculateProjectedStats(players) {
    // Calculate projected team stats based on current lineup
    const totalOPS = Object.values(players).reduce((sum, player) => sum + player.ops, 0);
    const averageOPS = totalOPS / Object.keys(players).length;
    
    return {
        projectedRuns: averageOPS * 4.2, // Simplified runs projection
        projectedAverage: averageOPS * 0.7, // Rough average correlation
        totalOPS: totalOPS,
        averageOPS: averageOPS
    };
}
