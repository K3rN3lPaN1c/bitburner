import * as CONSTANTS from "lib_constants.js";

import {syncRun} from "lib_syncRun";
import {downloadAllFiles} from "./lib_downloadAllFiles";

/** @param {import(".").NS } ns */
export async function main(ns) {
    ns.toast("Running dispatcher", "info");

    if (!ns.scriptRunning(CONSTANTS.SCRIPT_INFINITE_ATTACK, CONSTANTS.SERVER_HOME)) {
        ns.exec(CONSTANTS.SCRIPT_INFINITE_ATTACK, CONSTANTS.SERVER_HOME);
    }

    await downloadAllFiles(ns, CONSTANTS.SCRIPTS_BASE_URL, CONSTANTS.SCRIPTS);

    await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_ESCAPE_THE_BITNODE);


    await syncRun(ns, CONSTANTS.SCRIPT_SET_NEXT_TARGET_FACTION);
    let nextFaction = ns.read("nextTargetFaction.txt");

    await syncRun(ns, CONSTANTS.SCRIPT_NETWORK_DISCOVERY);
    // await syncRun(ns, CONSTANTS.SCRIPT_MANAGE_PURCHASED_SERVERS);
    // await syncRun(ns, CONSTANTS.SCRIPT_GANG_MANAGEMENT);
    // await syncRun(ns, CONSTANTS.SCRIPT_HACKNET_NODE_MANAGEMENT);

    if (CONSTANTS.FALG_KEEP_SINGULARITY_FUNCTIONS_RUNNING) {
        await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_PHYSICAL_MANAGEMENT);
        await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_AUTO_JOIN_FACTIONS);
        await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_BACKDOOR_PRE_REQS);
        await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_TRAININGS, CONSTANTS.SERVER_HOME, nextFaction);
        await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_MISSING_PROGRAMS);
        await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_KARMA_PRE_REQS);
        await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_TRAVEL_PRE_REQS);
        await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_FACTION_DONATIONS, CONSTANTS.SERVER_HOME, nextFaction);
        if (CONSTANTS.FALG_KEEP_SINGULARITY_WORK_FUNCTIONS_RUNNING) {
            await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_FACTION_WORK, CONSTANTS.SERVER_HOME, nextFaction);
            await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_DO_CRIMES);
        }
        await syncRun(ns, CONSTANTS.SCRIPT_SINGULARITY_HANDLE_AUGMENT_INSTALLATIONS, CONSTANTS.SERVER_HOME, nextFaction);
    }
}