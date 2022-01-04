import * as CONSTANTS from "lib_constants.js";
import {getUnboughtAugmentsFromFaction} from "./lib_singularity_unboughtAugmentsFromFaction";
import {getHighestAugmentRepReqForFaction} from "./lib_singularity_highestAugmentRepReqForFaction";

/** @param {import(".").NS } ns */
export async function main(ns) {
    let factionName = ns.args[0];
    let playerFactions = ns.getPlayer().factions;

    if (!playerFactions.includes(factionName)) {
        return;
    }

    let unboughtAugmentsFromFaction = getUnboughtAugmentsFromFaction(ns, factionName);

    let highestAugmentRepReq = getHighestAugmentRepReqForFaction(ns, factionName, unboughtAugmentsFromFaction);
    let factionFavor = ns.getFactionFavor(factionName);
    let favorToDonate = ns.getFavorToDonate();
    let factionRep = ns.getFactionRep(factionName);

    if (factionFavor >= favorToDonate && factionRep < highestAugmentRepReq) {
        let moneyToSafelyDonate = ns.getPlayer().money / CONSTANTS.SINGULARITY_FACTION_DONATE_MONEY_SAFETY_MARGIN;
        let factionRepMult = ns.getPlayer().faction_rep_mult;
        let possibleRepGain = (moneyToSafelyDonate / 1e6) * factionRepMult;
        let missingRep = highestAugmentRepReq - factionRep;

        if (highestAugmentRepReq <= factionRep + possibleRepGain) {
            let moneyToDonate = missingRep / factionRepMult * 1e6;
            if (ns.donateToFaction(factionName, moneyToDonate)) {
                ns.toast(ns.sprintf("Donating %d money to gain %d reputation!", moneyToDonate, missingRep));
            }
        }
    }
}