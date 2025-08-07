// Logging Utilities

import { formatTimestamp } from './helpers.js';

export function addOptimizationLog(message, type = 'info') {
    const log = document.getElementById('optimizationLog');
    const timestamp = formatTimestamp();
    const logEntry = document.createElement('div');
    logEntry.innerHTML = `[${timestamp}] ${message}`;
    logEntry.style.color = getLogColor(type);
    log.appendChild(logEntry);
    log.scrollTop = log.scrollHeight;
    log.style.display = 'block';
}

export function addPitcherLog(message, type = 'info') {
    const log = document.getElementById('pitcherDecisionLog');
    const timestamp = formatTimestamp();
    const logEntry = document.createElement('div');
    logEntry.innerHTML = `[${timestamp}] ${message}`;
    logEntry.style.color = getLogColor(type);
    log.appendChild(logEntry);
    log.scrollTop = log.scrollHeight;
    log.style.display = 'block';
}

export function addInjuryAlert(message) {
    const notifications = document.getElementById('injuryNotifications');
    const alert = document.createElement('div');
    alert.className = 'injury-alert';
    alert.innerHTML = `🚨 ${message}`;
    notifications.appendChild(alert);
    notifications.style.display = 'block';
}

export function showCompletionBanner(message, type = 'success') {
    const banner = document.createElement('div');
    banner.className = `completion-banner ${type}`;
    banner.innerHTML = message;
    
    // Add to appropriate section
    const targetSection = type === 'pitcher' ? 
        document.querySelector('.pitching-section .optimization-controls') :
        document.querySelector('.lineup-section .optimization-controls');
    
    targetSection.appendChild(banner);
    
    // Auto-remove after 5 seconds
    setTimeout(() => banner.remove(), 5000);
}

function getLogColor(type) {
    switch(type) {
        case 'success': return '#90EE90';
        case 'warning': return '#ffd700';
        case 'error': return '#ff6b6b';
        default: return '#fff';
    }
}
