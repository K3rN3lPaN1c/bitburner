import * as CONSTANTS from "lib_constants.js";

import {syncRunScripts} from "lib_syncRun";
import {downloadAllFiles} from "./lib_downloadAllFiles";

/** @param {import(".").NS } ns */
export async function main(ns) {
    // ns.toast("Dont forget about the alias: \"EXEs\"!!!");
    ns.toast("Running dispatcher", "info");

    if (!ns.scriptRunning(CONSTANTS.SCRIPT_INFINITE_ATTACK, CONSTANTS.SERVER_HOME)) {
        ns.exec(CONSTANTS.SCRIPT_INFINITE_ATTACK, CONSTANTS.SERVER_HOME);
    }

    await downloadAllFiles(ns, CONSTANTS.SCRIPTS_BASE_URL, CONSTANTS.SCRIPTS_LIBS);
    await downloadAllFiles(ns, CONSTANTS.SCRIPTS_BASE_URL, CONSTANTS.SCRIPTS_CONTROLLERS);
    await syncRunScripts(ns, CONSTANTS.SCRIPTS_TO_RUN[CONSTANTS.SCRIPT_DISPATCHER]);

    ns.exec(CONSTANTS.SCRIPT_SINGULARITY_DISPATCHER, CONSTANTS.SERVER_HOME);
    if (CONSTANTS.FLAG_KEEP_DISPATCHER_RUNNING) {
        ns.spawn(CONSTANTS.SCRIPT_DISPATCHER);
    }
}