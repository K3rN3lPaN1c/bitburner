/** @param {NS} ns **/
export function testLib(ns) {
    ns.alert("CommonLib works like a magic!");
}

/** @param {NS} ns **/
export function execScript(ns, scriptName, targetServer) {
    let scriptRam = ns.getScriptRam(scriptName, targetServer);
    let serverAvailableRam = ns.getServerMaxRam -ns.getServerUsedRam;
    if (scriptRam > serverAvailableRam) {
        ns.alert(ns.sprintf("Cannot run script %s on server %s, %d / %d", scriptName, targetServer, scriptRam, serverAvailableRam));
        return;
    }

    ns.exec(scriptName, targetServer);
}