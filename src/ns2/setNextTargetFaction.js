import * as CONSTANTS from "./lib_constants";
import {getUnboughtAugmentsFromFaction} from "./lib_singularity_unboughtAugmentsFromFaction";

/** @param {import(".").NS } ns */
export async function main(ns) {
    let nextTargetFaction = getNextTargetFaction(ns);
    ns.write("nextTargetFaction.txt", nextTargetFaction, "w");
}

/** @param {import(".").NS } ns */
function getNextTargetFaction(ns) {
    for (let i = 0 ; i < CONSTANTS.FACTIONS_PREFERRED_ORDER.length ; i++) {
        let nextFaction = CONSTANTS.FACTIONS_PREFERRED_ORDER[i];

        if (getUnboughtAugmentsFromFaction(ns, nextFaction).length) {
            return nextFaction;
        }
    }
}