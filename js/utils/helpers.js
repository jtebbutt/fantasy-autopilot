// Helper Functions

export function getStealScoreClass(score) {
    if (!score) return '';
    if (score >= 60) return 'good';
    if (score >= 50) return 'average';
    return 'poor';
}

export function getOPSClass(ops) {
    if (ops >= 0.850) return 'good';
    if (ops >= 0.750) return 'average';
    return 'poor';
}

export function calculateAverageOPS(players) {
    const opsValues = Object.values(players).map(player => player.ops);
    return opsValues.reduce((sum, ops) => sum + ops, 0) / opsValues.length;
}

export function findWorstPlayer(players) {
    return Object.values(players).reduce((worst, current) => 
        current.ops < worst.ops ? current : worst
    );
}

export function findBestPlayer(players) {
    return Object.values(players).reduce((best, current) => 
        current.ops > best.ops ? current : best
    );
}

export function formatOPS(ops) {
    return ops.toFixed(3);
}

export function formatTimestamp() {
    return new Date().toLocaleTimeString();
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
