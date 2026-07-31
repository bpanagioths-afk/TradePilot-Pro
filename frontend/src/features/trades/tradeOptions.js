export const tradingSystemLabels = {
    1: "SMC",
    2: "Price Trap",
    3: "ICT",
    4: "Liquidity Grab",
    5: "Breakout",
    6: "Trend Following",
    7: "Scalping"
};


export const psychologyStateLabels = {
    1: "Ήρεμος",
    2: "Σίγουρος",
    3: "Συγκεντρωμένος",
    4: "Αγχωμένος",
    5: "FOMO",
    6: "Revenge",
    7: "Κουρασμένος",
    8: "Βιαστικός"
};


function createOptions(labels) {
    return Object.entries(labels).map(
        ([id, label]) => ({
            id: Number(id),
            label
        })
    );
}


export const tradingSystemOptions = createOptions(
    tradingSystemLabels
);


export const psychologyStateOptions = createOptions(
    psychologyStateLabels
);