import * as CONSTANTS from "lib_constants.js";

import {syncRun} from "lib_syncRun";
import {downloadAllFiles} from "./lib_downloadAllFiles";
import {getUnboughtAugmentsFromFaction} from "./lib_singularity_unboughtAugmentsFromFaction";

/** @param {import(".").NS } ns */
export async function main(ns) {
    ns.toast("Running singularity dispatcher", "info");

    await downloadAllFiles(ns, CONSTANTS.SCRIPTS_BASE_URL, CONSTANTS.SCRIPTS_SINGULARITY_CONTROLLERS);

    let nextFaction = getNextTargetFaction(ns);

    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_PHYSICAL_MANAGEMENT);
    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_AUTO_JOIN_FACTIONS);
    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_ESCAPE_THE_BITNODE);
    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_BACKDOOR_PRE_REQS);
    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_TRAININGS, CONSTANTS.SERVER_HOME, nextFaction);
    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_MISSING_PROGRAMS);
    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_KARMA_PRE_REQS);
    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_TRAVEL_PRE_REQS);
    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_FACTION_DONATIONS, CONSTANTS.SERVER_HOME, nextFaction);
    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_FACTION_WORK, CONSTANTS.SERVER_HOME, nextFaction);
    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_AUGMENT_INSTALLATIONS, CONSTANTS.SERVER_HOME, nextFaction);
    await ns.asleep(10);
    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_DO_CRIMES);
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