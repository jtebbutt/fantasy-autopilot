// Injury Management Module

import { addInjuryAlert, showCompletionBanner } from '../utils/logging.js';
import { sleep } from '../utils/helpers.js';

export async function checkInjuries() {
    const injuryDiv = document.getElementById('injuryNotifications');
    injuryDiv.innerHTML = '';
    
    addInjuryAlert('🔍 Scanning injury reports across MLB...');
    
    await sleep(3000);
    
    // Simulate injury check results
    const injuryResults = await simulateInjuryCheck();
    
    if (injuryResults.newInjuries.length === 0) {
        addInjuryAlert('✅ All active lineup players cleared - no new injuries detected');
        addInjuryAlert('📋 Monitoring list: Alec Bohm (IL10) - no timeline update');
        addInjuryAlert('🏥 Auto-substitution ready if injuries detected');
        
        showCompletionBanner('🏥 Injury Check Complete! All players healthy and ready to play.', 'no-changes');
    } else {
        // Handle new injuries
        injuryResults.newInjuries.forEach(injury => {
            addInjuryAlert(`🚨 NEW INJURY: ${injury.player} - ${injury.status}`);
        });
        
        if (injuryResults.autoSubs.length > 0) {
            injuryResults.autoSubs.forEach(sub => {
                addInjuryAlert(`🔄 AUTO-SUB: ${sub.out} → ${sub.in}`);
            });
            showCompletionBanner('🏥 Injuries Detected! Auto-substitutions completed.', 'injury');
        } else {
            showCompletionBanner('🏥 Injuries Detected! Manual review required.', 'injury');
        }
    }
}

async function simulateInjuryCheck() {
    // Simulate API calls to injury databases
    await sleep(1000);
    
    // For demo purposes, return no new injuries most of the time
    const random = Math.random();
    
    if (random > 0.8) {
        // Simulate finding a new injury
        return {
            newInjuries: [
                { player: "George Springer", status: "Day-to-Day (Back)" }
            ],
            autoSubs: [
                { out: "George Springer", in: "Ian Happ" }
            ]
        };
    }
    
    return {
        newInjuries: [],
        autoSubs: []
    };
}

export function getInjuryRisk(player) {
    // Calculate injury risk based on player history, age, etc.
    const riskFactors = {
        age: player.age > 32 ? 0.3 : 0.1,
        recentInjuries: player.recentInjuries || 0,
        position: player.pos === 'C' ? 0.2 : 0.1
    };
    
    return Object.values(riskFactors).reduce((sum, risk) => sum + risk, 0);
}

export function suggestReplacement(injuredPlayer, availablePlayers) {
    // Find best replacement based on position and performance
    const samePosition = availablePlayers.filter(p => 
        p.pos === injuredPlayer.pos || p.pos.includes(injuredPlayer.pos)
    );
    
    if (samePosition.length > 0) {
        return samePosition.reduce((best, current) => 
            current.ops > best.ops ? current : best
        );
    }
    
    // If no same position, find best utility player
    return availablePlayers.reduce((best, current) => 
        current.ops > best.ops ? current : best
    );
}
