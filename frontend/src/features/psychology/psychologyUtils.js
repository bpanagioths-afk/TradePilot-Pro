import {
    psychologyStateLabels
} from "../trades/tradeOptions";


export {
    psychologyStateLabels
};


export function normalizePsychologyRows(rows = []) {
    if (!Array.isArray(rows)) {
        return [];
    }

    return rows.map((row) => {
        const movement = row.movement_breakdown?.[0];

        return {
            ...row,
            name:
                psychologyStateLabels[
                    row.psychology_state_id
                ]
                || "Άγνωστο",
            value: Number(
                movement?.total ?? 0
            ),
            average: Number(
                movement?.average ?? 0
            ),
            unit:
                movement?.unit
                ?? "pips",
            trades: Number(
                row.trades ?? 0
            )
        };
    });
}