import * as CONSTANTS from "lib_constants.js";
import {getUnboughtAugmentsFromFaction} from "./lib_singularity_unboughtAugmentsFromFaction.js";

/** @param {import(".").NS } ns */
export async function main(ns) {
    let factionsToJoin = ns.checkFactionInvitations();
    for (let i = 0 ; i < factionsToJoin.length ; i++) {
        let faction = factionsToJoin[i];

        if (!CONSTANTS.FACTIONS_DONT_AUTO_JOIN.includes(faction) || getUnboughtAugmentsFromFaction(ns, faction).length) {
            ns.joinFaction(faction);
            ns.toast("Joined faction: " + faction);
        }
    }
}





