import * as CONSTANTS from "lib_constants.js";
import {getHighestAugmentRepReqForFaction} from "./lib_singularity_highestAugmentRepReqForFaction";
import {getUnboughtAugmentsFromFaction} from "./lib_singularity_unboughtAugmentsFromFaction";
import {getUnboughtEnoughRepAugmentsFromFaction} from "./lib_singularity_unboughtEnoughRepAugmentsFromFaction";
import {SERVER_HOME} from "lib_constants.js";

/** @param {import(".").NS } ns */
export async function main(ns) {

    let factionName = ns.args[0];
    let unboughtAugmentsFromFaction = getUnboughtAugmentsFromFaction(ns, factionName);
    let factionRep = ns.getFactionRep(factionName);
    let factionFavor = ns.getFactionFavor(factionName);
    let factionFavorGain = ns.getFactionFavorGain(factionName);
    let favorToDonate = ns.getFavorToDonate();
    let playerFactions = ns.getPlayer().factions;
    let highestAugmentRepReq = getHighestAugmentRepReqForFaction(ns, factionName, unboughtAugmentsFromFaction);

    if (!playerFactions.includes(factionName)) {
        return;
    }

    if (
        highestAugmentRepReq <= factionRep
        || factionFavorGain >= CONSTANTS.SINGULARITY_FACTION_FAVOR_GAIN_THRESHOLD
        || (
            factionFavor < favorToDonate
            && factionFavorGain + factionFavor >= favorToDonate
        )
    ) {
        while (true) {
            await ns.asleep(1);
            let unboughtAugmentsFromFaction = getUnboughtEnoughRepAugmentsFromFaction(
                ns,
                factionName,
                getUnboughtAugmentsFromFaction(ns, factionName)
            );

            if (unboughtAugmentsFromFaction.length === 0) {
                break;
            }



            if (ns.getPlayer().money < getEnoughRepHighestAugmentPriceForFaction(ns, factionName, unboughtAugmentsFromFaction)) {
                return;
            }

            let nextAug = getEnoughRepMostExpensiveAugmentForFaction(ns, factionName, unboughtAugmentsFromFaction);
            if (nextAug === "" || nextAug === undefined) {
                ns.toast("EMPTY AUG :(", "error");
                return;
            }

            let prereq = ns.getAugmentationPrereq(nextAug);
            if (prereq.length) {
                for (let j = 0; j < prereq.length; j++) {
                    if (ns.getOwnedAugmentations(true).includes(prereq[j])) {
                        continue;
                    }

                    if (!ns.purchaseAugmentation(factionName, prereq[j])) {
                        return;
                    }
                }
            }

            await ns.asleep(1);

            if (ns.purchaseAugmentation(factionName, nextAug)) {
                ns.toast("Bought augmentation: " + nextAug);
            } else {
                ns.toast("Error buying augmentation: " + nextAug, "error");
                return;
            }
        }

        let numberOfNf = buyMaxNumberOfNf(ns, factionName);

        ns.kill(CONSTANTS.SCRIPT_INFINITE_ATTACK, SERVER_HOME);
        ns.stopAction();
        await ns.asleep(10);

        if (
            ns.getOwnedAugmentations(true).length > ns.getOwnedAugmentations(false).length
            || numberOfNf > 0
        ) {
            // ns.installAugmentations("init.js");
            ns.installAugmentations();
        } else {
            // ns.softReset("init.js");
            ns.softReset();
        }
    }
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 * @param {string[]} unboughtAugmentsFromFaction
 */
function getEnoughRepHighestAugmentPriceForFaction(ns, factionName, unboughtAugmentsFromFaction) {
    let highestPrice = 0;

    for (let i = 0 ; i < unboughtAugmentsFromFaction.length ; i++) {
        let augment = unboughtAugmentsFromFaction[i];
        let augmentPrice = ns.getAugmentationPrice(augment);
        if (augmentPrice > highestPrice) {
            highestPrice = augmentPrice;
        }
    }

    return highestPrice;
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 * @param {string[]} unboughtAugmentsFromFaction
 */
function getEnoughRepMostExpensiveAugmentForFaction(ns, factionName, unboughtAugmentsFromFaction) {
    let highestPrice = 0;
    let mostExpensiveAugment = "";

    for (let i = 0 ; i < unboughtAugmentsFromFaction.length ; i++) {
        let augment = unboughtAugmentsFromFaction[i];
        let augmentPrice = ns.getAugmentationPrice(augment);
        if (augmentPrice >= highestPrice) {
            highestPrice = augmentPrice;
            mostExpensiveAugment = augment;
        }
    }

    return mostExpensiveAugment;
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 */
function buyMaxNumberOfNf(ns, factionName) {
    let numberOfNf = 0;
    while(ns.purchaseAugmentation(factionName, CONSTANTS.AUGMENTATION_NEUROFLUX_GOVERNOR)){
        numberOfNf++;
    }
    if (numberOfNf > 0) {
        ns.toast(ns.sprintf("Bought %d levels of %s", numberOfNf, CONSTANTS.AUGMENTATION_NEUROFLUX_GOVERNOR));
    }
    return numberOfNf;
}