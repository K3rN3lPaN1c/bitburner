export const CREATED_SCRIPT_GROW = "grow.script";
export const CREATED_SCRIPT_WEAKEN = "weaken.script";
export const CREATED_SCRIPT_HACK = "hack.script";

export const CREATED_SCRIPTS = [
    CREATED_SCRIPT_GROW,
    CREATED_SCRIPT_WEAKEN,
    CREATED_SCRIPT_HACK,
]

/** @param {import(".").NS } ns */
export function testLib(ns) {
    ns.alert("CommonLib works like a magic!");
}

/** @param {import(".").NS } ns
 * @param {string} scriptName
 * @param {string} targetServer
 */
export function execScript(ns, scriptName, targetServer) {
    let scriptRam = ns.getScriptRam(scriptName, targetServer);
    let serverAvailableRam = ns.getServerMaxRam -ns.getServerUsedRam;
    if (scriptRam > serverAvailableRam) {
        ns.alert(ns.sprintf("Cannot run script %s on server %s, %d / %d", scriptName, targetServer, scriptRam, serverAvailableRam));
        return;
    }

    ns.exec(scriptName, targetServer);
}

/** @param {import(".").NS } ns */
export function disableLogs(ns) {
    ns.disableLog("getServerMaxMoney");
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("getServerSecurityLevel");
    ns.disableLog("getServerMinSecurityLevel");
    ns.disableLog("getServerMaxRam");
    ns.disableLog("getServerUsedRam");
    ns.disableLog("scan");

    ns.clearLog();
}