const SERVER_HOME = "home";

/** @param {import("./index").NS } ns
 * @param {string} scriptName
 * @param {string} targetServer
 */
export async function syncRun(ns, scriptName, targetServer= SERVER_HOME, args) {
    let scriptRam = ns.getScriptRam(scriptName, targetServer);
    let serverAvailableRam = ns.getServerMaxRam(targetServer) - ns.getServerUsedRam(targetServer);
    if (scriptRam > serverAvailableRam) {
        ns.toast(ns.sprintf("Cannot run script %s on server %s, %d / %d", scriptName, targetServer, scriptRam, serverAvailableRam), "error");
        return;
    }

    let pid
    if (args !== undefined) {
        pid = ns.exec(scriptName, targetServer, 1, args);
    } else {
        pid = ns.exec(scriptName, targetServer);
    }

    if (pid > 0) {
        ns.toast(ns.sprintf(
            "Started script '%s' using %d / %d GB RAM. PID = %d",
            scriptName,
            scriptRam,
            serverAvailableRam,
            pid
        ));
    } else {
        ns.toast(ns.sprintf(
            "Error starting script '%s'",
            scriptName
        ), "error");
    }

    while (ns.scriptRunning(scriptName, targetServer)) {
        await ns.sleep(1);
    }
}

/** @param {import("./index").NS } ns
 * @param {string[]} scripts
 * @param {string} targetServer
 */
export async function syncRunScripts(ns, scripts, targetServer = SERVER_HOME) {
    for (let i = 0 ; i < scripts.length ; i++) {
        let scriptToRun = scripts[i];
        await syncRun(ns, scriptToRun, targetServer);
    }
}