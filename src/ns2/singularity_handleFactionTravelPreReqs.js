import * as CONSTANTS from "lib_constants.js";
import {getUnboughtAugmentsFromFaction} from "./lib_singularity_unboughtAugmentsFromFaction";
import {travelIfNeeded} from "./lib_singularity_travelIfNeeded";

/** @param {import(".").NS } ns */
export async function main(ns) {
    let playerFactions = ns.getPlayer().factions;
    for (let i = 0 ; i < CONSTANTS.FACTIONS_PREFERRED_ORDER.length ; i++) {
        let factionName = CONSTANTS.FACTIONS_PREFERRED_ORDER[i];

        if (
            playerFactions.includes(factionName)
            || !(factionName in CONSTANTS.FACTIONS_CITY_REQUIREMENTS)
            || getUnboughtAugmentsFromFaction(ns, factionName).length === 0
        ) {
            continue;
        }

        if (factionName in CONSTANTS.FACTIONS_EXCLUSIONS) {
            let excludingFactions = CONSTANTS.FACTIONS_EXCLUSIONS[factionName];
            let isExcluded = false;
            for (let j = 0 ; j < excludingFactions.length ; j++) {
                if (playerFactions.includes(excludingFactions[j])) {
                    isExcluded = true;
                }
            }
            if (isExcluded) {
                continue;
            }
        }

        travelIfNeeded(ns, CONSTANTS.FACTIONS_CITY_REQUIREMENTS[factionName]);
        return;
    }

    travelIfNeeded(ns, CONSTANTS.CITY_SECTOR_12);
}