// Player Data Structures

export const lineupPlayers = {
    perez: { 
        name: "Salvador Perez", 
        team: "KC", 
        pos: "C", 
        ops: 0.825, 
        stealScore: null, 
        status: "active", 
        vsHand: "RHP" 
    },
    goldschmidt: { 
        name: "Paul Goldschmidt", 
        team: "NYY", 
        pos: "1B", 
        ops: 0.892, 
        stealScore: null, 
        status: "active", 
        vsHand: "LHP" 
    },
    donovan: { 
        name: "Brendan Donovan", 
        team: "STL", 
        pos: "2B", 
        ops: 0.756, 
        stealScore: 51, 
        status: "active", 
        vsHand: "RHP" 
    },
    machado: { 
        name: "Manny Machado", 
        team: "SD", 
        pos: "3B", 
        ops: 0.834, 
        stealScore: 58, 
        status: "active", 
        vsHand: "RHP" 
    },
    turner: { 
        name: "Trea Turner", 
        team: "PHI", 
        pos: "SS", 
        ops: 0.801, 
        stealScore: 67, 
        status: "active", 
        vsHand: "RHP" 
    },
    abrams: { 
        name: "CJ Abrams", 
        team: "WSH", 
        pos: "IF", 
        ops: 0.723, 
        stealScore: 69, 
        status: "active", 
        vsHand: "LHP" 
    },
    judge: { 
        name: "Aaron Judge", 
        team: "NYY", 
        pos: "OF", 
        ops: 1.034, 
        stealScore: 71, 
        status: "active", 
        vsHand: "LHP" 
    },
    springer: { 
        name: "George Springer", 
        team: "TOR", 
        pos: "OF", 
        ops: 0.689, 
        stealScore: 45, 
        status: "active", 
        vsHand: "RHP" 
    },
    nimmo: { 
        name: "Brandon Nimmo", 
        team: "NYM", 
        pos: "OF", 
        ops: 0.798, 
        stealScore: 65, 
        status: "active", 
        vsHand: "RHP" 
    },
    ward: { 
        name: "Taylor Ward", 
        team: "LAA", 
        pos: "UTIL", 
        ops: 0.712, 
        stealScore: 49, 
        status: "active", 
        vsHand: "RHP" 
    },
    chapman: { 
        name: "Matt Chapman", 
        team: "SF", 
        pos: "UTIL", 
        ops: 0.745, 
        stealScore: null, 
        status: "active", 
        vsHand: "LHP" 
    }
};

export const benchPlayers = {
    happ: { 
        name: "Ian Happ", 
        team: "CHC", 
        pos: "OF", 
        ops: 0.867, 
        stealScore: 63, 
        status: "bench", 
        vsHand: "RHP" 
    },
    ozuna: { 
        name: "Marcell Ozuna", 
        team: "ATL", 
        pos: "OF", 
        ops: 0.821, 
        stealScore: 43, 
        status: "bench", 
        vsHand: "LHP" 
    },
    lee: { 
        name: "Jung Hoo Lee", 
        team: "SF", 
        pos: "OF", 
        ops: 0.704, 
        stealScore: null, 
        status: "bench", 
        vsHand: "LHP" 
    }
};

export const injuredPlayers = [
    { name: "Alec Bohm", team: "PHI", status: "IL10" }
];
