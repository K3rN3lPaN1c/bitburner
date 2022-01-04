import * as CONSTANTS from "lib_constants.js";
import {WORK_TYPE_WORKING_FOR_FACTION} from "lib_constants.js";

/** @param {import(".").NS } ns */
export async function main(ns) {
    if ([...CONSTANTS.SINGULARITY_WORK_TYPES_NOT_TO_INTERRUPT, CONSTANTS.WORK_TYPE_LEARNING_WORKOUT, WORK_TYPE_WORKING_FOR_FACTION].includes(ns.getPlayer().workType)) {
        return;
    }
    ns.toast(ns.getPlayer().workType);

    let crimes = CONSTANTS.CRIMES_PREFERRED_ORDER;

    for (let i = 0 ; i < crimes.length ; i++) {
        let crime = crimes[i];
        let crimeChance = ns.getCrimeChance(crime);
        let cycleTime = 10000;

        if (crimeChance === 1 || i === crimes.length-1) {
            let crimeTime = ns.getCrimeStats(crime).time;

            if (crimeTime > cycleTime) {
                ns.commitCrime(crime);
            } else {
                let remainingTime = cycleTime;
                while (remainingTime > crimeTime) {
                    remainingTime-= crimeTime;
                    ns.commitCrime(crime);
                    await ns.asleep(crimeTime);
                }
            }

            break;
        }
    }

}