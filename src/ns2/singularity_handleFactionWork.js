import * as CONSTANTS from "lib_constants.js";
import {getHighestAugmentRepReqForFaction} from "./lib_singularity_highestAugmentRepReqForFaction";
import {getUnboughtAugmentsFromFaction} from "./lib_singularity_unboughtAugmentsFromFaction";

/** @param {import(".").NS } ns */
export async function main(ns) {
    if ([...CONSTANTS.SINGULARITY_WORK_TYPES_NOT_TO_INTERRUPT, CONSTANTS.WORK_TYPE_LEARNING_WORKOUT].includes(ns.getPlayer().workType)) {
        return;
    }

    let factionName = ns.args[0];
    let playerFactions = ns.getPlayer().factions;

    if (!playerFactions.includes(factionName)) {
        return;
    }


    if (ns.getFactionRep(factionName) > getHighestAugmentRepReqForFaction(ns, factionName, getUnboughtAugmentsFromFaction(ns, factionName))) {
        if (ns.getPlayer().workType === CONSTANTS.WORK_TYPE_WORKING_FOR_FACTION) {
            ns.stopAction();
        }
        return;
    }

    // if (!ns.workForFaction(factionName, CONSTANTS.WORK_FACTION_HACKING_CONTRACTS)) {
    //     ns.workForFaction(factionName, CONSTANTS.WORK_FACTION_SECURITY_WORK);
    // }

    if (!ns.workForFaction(factionName, CONSTANTS.WORK_FACTION_SECURITY_WORK)) {
        if (!ns.workForFaction(factionName, CONSTANTS.WORK_FACTION_FIELD_WORK)) {
            ns.workForFaction(factionName, CONSTANTS.WORK_FACTION_HACKING_CONTRACTS);
        }
    }

}