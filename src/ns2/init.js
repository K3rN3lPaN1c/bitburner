import * as commonLib from "commonLib.js"

const server_home = "home";
const script_network_discovery = "network_discovery_and_gaining_root_access.js";

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
        await ns.asleep(10000);
        commonLib.execScript(ns, script_network_discovery, server_home);
    }
}