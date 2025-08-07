// Pitcher Data Structures

export const pitchers = {
    imanaga: { 
        name: "Shota Imanaga", 
        team: "CHC", 
        pos: "SP", 
        opsVs: 0.742, 
        opsAllowed: 0.624, 
        opponent: "KC", 
        starting: true,
        handedness: "LHP"
    },
    hader: { 
        name: "Josh Hader", 
        team: "HOU", 
        pos: "RP", 
        opsVs: null, 
        opsAllowed: 0.511, 
        opponent: "AZ", 
        starting: false,
        handedness: "LHP"
    },
    diaz: { 
        name: "Edwin Díaz", 
        team: "NYM", 
        pos: "P", 
        opsVs: null, 
        opsAllowed: 0.568, 
        opponent: "LAA", 
        starting: false,
        handedness: "RHP"
    },
    gilbert: { 
        name: "Logan Gilbert", 
        team: "SEA", 
        pos: "P", 
        opsVs: null, 
        opsAllowed: 0.689, 
        opponent: null, 
        starting: false,
        handedness: "RHP"
    },
    peterson: { 
        name: "David Peterson", 
        team: "NYM", 
        pos: "P", 
        opsVs: null, 
        opsAllowed: 0.734, 
        opponent: "LAA", 
        starting: false,
        handedness: "LHP"
    },
    pepiot: { 
        name: "Ryan Pepiot", 
        team: "TB", 
        pos: "P", 
        opsVs: 0.661, 
        opsAllowed: 0.663, 
        opponent: "CWS", 
        starting: true,
        handedness: "RHP"
    },
    valdez: { 
        name: "Framber Valdez", 
        team: "HOU", 
        pos: "P", 
        opsVs: null, 
        opsAllowed: 0.701, 
        opponent: null, 
        starting: false,
        handedness: "LHP"
    }
};

export const benchPitchers = {
    cease: { 
        name: "Dylan Cease", 
        team: "SD", 
        opsVs: 0.697, 
        opsAllowed: 0.692, 
        opponent: "MIA", 
        starting: true,
        handedness: "RHP"
    },
    luzardo: { 
        name: "Jesús Luzardo", 
        team: "MIA", 
        opsVs: null, 
        opsAllowed: 0.648, 
        opponent: "BOS", 
        starting: false,
        handedness: "LHP"
    }
};

export const injuredPitchers = [
    { name: "Justin Slaten", team: "BOS", status: "IL60" }
];
