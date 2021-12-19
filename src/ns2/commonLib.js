/** @param {NS} ns **/
export function testLib(ns) {
    ns.alert("CommonLib works like a magic!");
}

/** @param {NS} ns **/
export async function execScript(ns, scriptName, targetServer, threadCount, args) {
    scriptRam = ns.getScriptRam(scriptName);
    serverAvailableRam = ns.getServerMaxRam -ns.getServerUsedRam;
    if (scriptRam > serverAvailableRam) {
        ns.alert(ns.sprintf("Cannot run script %s on server %s, %d / %d", scriptName, targetServer, scriptRam, serverAvailableRam));
        return;
    }
    ns.exec(scriptName, targetServer, threadCount, args);
}