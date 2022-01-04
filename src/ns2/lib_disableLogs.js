/** @param {import(".").NS } ns */
export function disableLogs(ns) {
    ns.disableLog("ALL");
    ns.clearLog();
}