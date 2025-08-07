// Main Application - Fantasy Baseball AUTOPILOT

import { updateAnalysis } from './modules/lineup.js';
import { runOptimization, runStealOptimization } from './modules/optimization.js';
import { checkInjuries } from './modules/injuries.js';
import { analyzePitchers } from './modules/pitching.js';
import { connectToYahoo } from './modules/yahoo.js';
import { addOptimizationLog } from './utils/logging.js';
import { initializeStealScoreClasses } from './utils/ui.js';

// Application state
let optimizationHistory = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('🚀 Initializing Fantasy Baseball AUTOPILOT...');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize UI elements
    initializeStealScoreClasses();
    
    // Initial analysis update
    updateAnalysis();
    
    // Simulate some activity on load
    setTimeout(() => {
        addOptimizationLog('🚀 AUTOPILOT system initialized and ready', 'success');
        addOptimizationLog('Real-time data monitoring active', 'info');
    }, 1000);
}

function setupEventListeners() {
    // Yahoo connection
    const connectYahooBtn = document.getElementById('connectYahooBtn');
    if (connectYahooBtn) {
        connectYahooBtn.addEventListener('click', connectToYahoo);
    }
    
    // Lineup optimization
    const optimizeBtn = document.getElementById('optimizeBtn');
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', handleOptimization);
    }
    
    // Steal optimization
    const stealOptimizeBtn = document.getElementById('stealOptimizeBtn');
    if (stealOptimizeBtn) {
        stealOptimizeBtn.addEventListener('click', runStealOptimization);
    }
    
    // Injury check
    const injuryCheckBtn = document.getElementById('injuryCheckBtn');
    if (injuryCheckBtn) {
        injuryCheckBtn.addEventListener('click', checkInjuries);
    }
    
    // Pitcher analysis
    const optimizePitchersBtn = document.getElementById('optimizePitchersBtn');
    if (optimizePitchersBtn) {
        optimizePitchersBtn.addEventListener('click', analyzePitchers);
    }
}

async function handleOptimization() {
    const optimizationStart = Date.now();
    
    try {
        await runOptimization();
        
        // Track optimization history
        optimizationHistory.push({
            timestamp: new Date(),
            duration: Date.now() - optimizationStart,
            success: true
        });
        
    } catch (error) {
        console.error('Optimization failed:', error);
        addOptimizationLog('❌ Optimization failed: ' + error.message, 'error');
        
        optimizationHistory.push({
            timestamp: new Date(),
            duration: Date.now() - optimizationStart,
            success: false,
            error: error.message
        });
    }
}

// Utility functions for application state
export function getOptimizationHistory() {
    return optimizationHistory;
}

export function clearOptimizationHistory() {
    optimizationHistory = [];
}

// Export main application for potential external use
export default {
    initialize: initializeApp,
    getHistory: getOptimizationHistory,
    clearHistory: clearOptimizationHistory
};
