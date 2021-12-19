import * as commonLib from "commonLib.js"

let server_home = "home";
let script_network_discovery = "network_discovery_and_gaining_root_access.js";

/** @param {NS} ns **/
export async function main(ns) {
    ns.disableLog("asleep");

    networkDiscovery(ns);

    while (true) {
        await ns.asleep(100);
    }
}

/** @param {NS} ns **/
async function networkDiscovery(ns) {
    while (true) {
        await ns.asleep(5000);
        commonLib.execScript(nk, script_network_discovery, server_home, 1);
    }
}