import * as commonLib from "commonLib.js"

const server_home = "home";
const script_network_discovery = "network_discovery_and_gaining_root_access.js";
const script_name_template = "early-hack-template%d.script";
const script_early_hack_template = "early-hack-template.script";

let redeploy_happened = false;

const baseTargetServers = [
    "n00dles",
    "harakiri-sushi",
    "phantasy",
    "rho-construction",
    "clarkinc",
    "megacorp",
    "b-and-a",
    "4sigma",
    "omnitek",
    "kuai-gong",
    "nwo",
    "blade",
    "global-pharm",
    "zb-def",
    "nova-med",
    "the-hub",
    "zeus-med",
    "unitalife",
];

/** @param {NS} ns **/
export async function main(ns) {
    ns.disableLog("asleep");

    networkDiscovery(ns);
    await ns.asleep(100);
    if (await ns.prompt("Auto start local hacks?")) {
        autoStartLocalHacks(ns);
    }

    while (true) {
        await ns.asleep(1000);
    }
}

/** @param {NS} ns **/
async function networkDiscovery(ns) {
    while (true) {
        await ns.asleep(10000);
        commonLib.execScript(ns, script_network_discovery, server_home);
    }
}

/** @param {import(".").NS } ns */
/** @param {NS} ns **/
async function autoStartLocalHacks(ns) {
    while(true){
        await ns.asleep(10000);

        for (let i = 0 ; i < baseTargetServers.length; i++) {
            let targetServer = baseTargetServers[i];
            let scriptName = ns.sprintf(script_name_template, i+1);
            let availableRam = ns.getServerMaxRam(server_home)-ns.getServerUsedRam(server_home);
            let numOfThreads = Math.min(10000, Math.floor(availableRam/ns.getScriptRam(scriptName, server_home)) - 5);

            if (
                !ns.isRunning(scriptName, server_home)
                && ns.hasRootAccess(targetServer)
                && numOfThreads > 0
            ) {
                ns.exec(scriptName, server_home, numOfThreads);
            }
        }

        if (ns.hasRootAccess("ecorp") && !redeploy_happened) {
            ns.exec("redeploy-to-outer-servers.script", server_home);
            redeploy_happened = true;
        }
    }
}