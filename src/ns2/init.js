const SERVER_HOME = "home";
const SCRIPT_NETWORK_DISCOVERY = "network_discovery_and_gaining_root_access.js";
const SCRIPT_NAME_TEMPLATE = "early-hack-template%d.script";
const SCRIPT_EARLY_HACK_TEMPLATE = "early-hack-template.script";

const FILES_BASE_URL = "https://raw.githubusercontent.com/K3rN3lPaN1c/bitburner/feature/kuvee-ns-scripts/src/ns2/";
const FILES_TO_DOWNLOAD = [
    "ServerDetails.js",
    "ServerDetailsCollection.js",
    "collectServerDetails.js",
    "commonLib.js",
    "downloadFiles.js",
    SCRIPT_NETWORK_DISCOVERY,
];

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

    await downloadAllFiles(ns);

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
        ns.exec(SCRIPT_NETWORK_DISCOVERY, SERVER_HOME);
    }
}

/** @param {import(".").NS } ns */
/** @param {NS} ns **/
async function autoStartLocalHacks(ns) {
    while(true){
        await ns.asleep(10000);

        for (let i = 0 ; i < baseTargetServers.length; i++) {
            let targetServer = baseTargetServers[i];
            let scriptName = ns.sprintf(SCRIPT_NAME_TEMPLATE, i+1);
            let availableRam = ns.getServerMaxRam(SERVER_HOME)-ns.getServerUsedRam(SERVER_HOME);
            let numOfThreads = Math.min(10000, Math.floor(availableRam/ns.getScriptRam(scriptName, SERVER_HOME)) - 5);

            if (
                !ns.isRunning(scriptName, SERVER_HOME)
                && ns.hasRootAccess(targetServer)
                && numOfThreads > 0
            ) {
                ns.exec(scriptName, SERVER_HOME, numOfThreads);
            }
        }

        if (ns.hasRootAccess("ecorp") && !redeploy_happened) {
            ns.exec("redeploy-to-outer-servers.script", SERVER_HOME);
            redeploy_happened = true;
        }
    }
}

async function downloadAllFiles(ns) {
    for (let i = 0 ; i < FILES_TO_DOWNLOAD.length ; i++) {
        let fileName = FILES_TO_DOWNLOAD[i];
        await ns.wget(FILES_BASE_URL + fileName, fileName);
    }
}