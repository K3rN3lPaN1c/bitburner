import * as CONSTANTS from "lib_constants.js";
import {getHighestAugmentRepReqForFaction} from "./lib_singularity_highestAugmentRepReqForFaction";
import {getUnboughtAugmentsFromFaction} from "./lib_singularity_unboughtAugmentsFromFaction";
import {getUnboughtEnoughRepAugmentsFromFaction} from "./lib_singularity_unboughtEnoughRepAugmentsFromFaction";

/** @param {import(".").NS } ns */
export async function main(ns) {
    let factionName = ns.args[0];
    let unboughtAugmentsFromFaction = getUnboughtAugmentsFromFaction(ns, factionName);
    let favorToDonate = ns.getFavorToDonate();
    let playerFactions = ns.getPlayer().factions;
    if (!playerFactions.includes(factionName)) {
        return;
    }

    if (isReadyToInstall(ns, factionName, unboughtAugmentsFromFaction, favorToDonate)) {
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

        handleAnyFactionDonateBuyNf(ns, playerFactions, favorToDonate, ns.getPlayer().money);

        await ns.asleep(10);
        ns.kill(CONSTANTS.SCRIPT_INFINITE_ATTACK, CONSTANTS.SERVER_HOME);
        await ns.asleep(10);
        ns.stopAction();
        await ns.asleep(10);

        if (
            ns.getOwnedAugmentations(true).length > ns.getOwnedAugmentations(false).length
            || numberOfNf > 0
        ) {
            ns.installAugmentations();
        } else {
            ns.softReset();
        }
    }
}

function handleAnyFactionDonateBuyNf(ns, playerFactions, favorToDonate, playerMoney) {
    let factionRepMult = ns.getPlayer().faction_rep_mult;
    let targetFaction;
    let targetFactionRep = 0;

    for (let i = 0 ; i < playerFactions.length ; i++) {
        let faction = playerFactions[i];

        let factionFavor = ns.getFactionFavor(faction);
        if (factionFavor < favorToDonate) {
            continue;
        }

        let factionRep = ns.getFactionRep(faction);
        if (factionRep > targetFactionRep) {
            targetFaction = faction;
            targetFactionRep = factionRep;
        }
    }

    ns.toast(
        ns.sprintf(
            "Targeting %s for faction donations." , targetFaction
        )
    );
    if (!targetFaction) {
        return;
    }

    while (true) {
        let missingRep = Math.max(0, ns.getAugmentationRepReq(CONSTANTS.AUGMENTATION_NEUROFLUX_GOVERNOR) - targetFactionRep);
        let nfPrice = ns.getAugmentationPrice(CONSTANTS.AUGMENTATION_NEUROFLUX_GOVERNOR);
        let moneyToDonate = missingRep / factionRepMult * 1e6;
        let compositePrice = moneyToDonate + nfPrice;
        if (playerMoney >= compositePrice) {
            playerMoney -= compositePrice;
            if (moneyToDonate > 0) {
                ns.donateToFaction(targetFaction, moneyToDonate);
            }
            ns.purchaseAugmentation(targetFaction, CONSTANTS.AUGMENTATION_NEUROFLUX_GOVERNOR);
            ns.toast("Buy a level of NF from " + targetFaction + " for " + compositePrice);
        }
        else {
            break;
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

function isReadyToInstall(
    ns,
    factionName,
    unboughtAugmentsFromFaction,
    favorToDonate,
) {
    let factionRep = ns.getFactionRep(factionName);
    let highestAugmentRepReq = getHighestAugmentRepReqForFaction(ns, factionName, unboughtAugmentsFromFaction);

    if (highestAugmentRepReq <= factionRep) {
        return true
    }

    let factionFavorGain = ns.getFactionFavorGain(factionName);
    if (factionFavorGain >= CONSTANTS.SINGULARITY_FACTION_FAVOR_GAIN_THRESHOLD) {
        return true
    }

    let factionFavor = ns.getFactionFavor(factionName);
    if (factionFavor < favorToDonate && factionFavorGain + factionFavor >= favorToDonate) {
        return true;
    }

    if (factionName in CONSTANTS.FACTIONS_REP_THRESHOLDS) {
        let lowestRepReq = getLowestRepReqOfUnboughtAugments(ns, unboughtAugmentsFromFaction);
        let repThresholds = CONSTANTS.FACTIONS_REP_THRESHOLDS[factionName];
        for (let i = 0 ; i < repThresholds.length ; i++) {
            let repThreshold = repThresholds[i];
            if (repThreshold < lowestRepReq) {
                continue;
            }

            if (factionRep >= repThreshold) {
                return true
            }
            break;
        }
    }

    return false;
}
/** @param {import(".").NS } ns
 * @param {string[]} unboughtAugmentsFromFaction
 */
function getLowestRepReqOfUnboughtAugments(ns, unboughtAugmentsFromFaction) {
    let lowestRepReq = ns.getAugmentationRepReq(unboughtAugmentsFromFaction[0]);
    for (let i = 1 ; i < unboughtAugmentsFromFaction.length ; i++) {
        let augment = unboughtAugmentsFromFaction[i];
        let augmentRepReq = ns.getAugmentationRepReq(augment);
        if (augmentRepReq < lowestRepReq) {
            lowestRepReq = augmentRepReq;
        }
    }
    return lowestRepReq;
}