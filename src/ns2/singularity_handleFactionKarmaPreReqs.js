import * as CONSTANTS from "lib_constants.js";
import {getUnboughtAugmentsFromFaction} from "./lib_singularity_unboughtAugmentsFromFaction";
import {CRIME_HOMICIDE} from "lib_constants.js";

/** @param {import(".").NS } ns */
export async function main(ns) {
    if ([...CONSTANTS.SINGULARITY_WORK_TYPES_NOT_TO_INTERRUPT, CONSTANTS.WORK_TYPE_LEARNING_WORKOUT].includes(ns.getPlayer().workType)) {
        return;
    }

    let playerFactions = ns.getPlayer().factions;
    let numPeopleKilled = ns.getPlayer().numPeopleKilled;

    for (let i = 0; i < CONSTANTS.FACTIONS_PREFERRED_ORDER.length; i++) {
        let factionName = CONSTANTS.FACTIONS_PREFERRED_ORDER[i];

        if (
            playerFactions.includes(factionName)
            || !(factionName in CONSTANTS.FACTIONS_KARMA_REQUIREMENTS)
            || getUnboughtAugmentsFromFaction(ns, factionName).length === 0
        ) {
            continue;
        }

        let requiredKills = Math.max(Math.abs(CONSTANTS.FACTIONS_KARMA_REQUIREMENTS[factionName] / 3), CONSTANTS.FACTIONS_PEOPLE_KILLED_REQUIREMENTS[factionName]);

        if (numPeopleKilled < requiredKills && ns.getCrimeChance(CRIME_HOMICIDE) === 1) {
            ns.commitCrime(CONSTANTS.CRIME_HOMICIDE);
            await ns.asleep(3000);
            ns.commitCrime(CONSTANTS.CRIME_HOMICIDE);
            await ns.asleep(3000);
            ns.commitCrime(CONSTANTS.CRIME_HOMICIDE);
            ns.exit();
        }
    }
}