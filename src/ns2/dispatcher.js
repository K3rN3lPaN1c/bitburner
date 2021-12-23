import * as commonLib from "commonLib.js";

const SERVER_HOME = "home";
const SCRIPT_NETWORK_DISCOVERY = "networkDiscoveryAndGainingRootAccess.js";
const SCRIPT_ATTACK_ALL_SERVERS = "attackAllServers.js";

//const FILES_BASE_URL = "https://raw.githubusercontent.com/K3rN3lPaN1c/bitburner/feature/kuvee-ns-scripts/src/ns2/";
const FILES_BASE_URL = "file:///C:/Bitburner/bitburner/src/ns2/";

const FILES_TO_DOWNLOAD = [
    SCRIPT_ATTACK_ALL_SERVERS,
    SCRIPT_NETWORK_DISCOVERY,
    "init.js",
    "formulasLib.js",
    "showServerMap.js",
    "ServerDetails.js",
    "ServerDetailsCollection.js",
];

const ENABLE_NETWORK_DISCOVERY = true;
const ENABLE_KEEP_DISPATCHER_RUNNING = true;
const ENABLE_ATTACK_ALL_SERVERS = true;

/** @param {import(".").NS } ns */
export async function main(ns) {
    commonLib.disableLogs(ns);

    await downloadAllFiles(ns);
    await prepareScripts(ns);

    networkDiscovery(ns);
    await ns.asleep(10);
    attackAllServers(ns);
    await ns.asleep(10);
    managePurchasedServers(ns);


    while (ENABLE_KEEP_DISPATCHER_RUNNING) {
        await ns.asleep(1000);
    }
}


/** @param {import(".").NS } ns */
async function downloadAllFiles(ns) {
    for (let i = 0 ; i < FILES_TO_DOWNLOAD.length ; i++) {
        let fileName = FILES_TO_DOWNLOAD[i];
        if (ns.fileExists(fileName)) {
            ns.rm(fileName);
        }
        await ns.wget(FILES_BASE_URL + fileName, fileName);
    }
}

/** @param {import(".").NS } ns */
async function prepareScripts(ns) {
    await ns.write(commonLib.CREATED_SCRIPTS[0], "grow(args[0])", "w");
    await ns.write(commonLib.CREATED_SCRIPTS[1], "weaken(args[0])", "w");
    await ns.write(commonLib.CREATED_SCRIPTS[2], "hack(args[0])", "w");
}


/** @param {import(".").NS } ns */
async function networkDiscovery(ns) {
    while (ENABLE_NETWORK_DISCOVERY) {
        await ns.asleep(5000);
        ns.exec(SCRIPT_NETWORK_DISCOVERY, SERVER_HOME);
    }
}


/** @param {import(".").NS } ns */
async function attackAllServers(ns) {
    while (ENABLE_ATTACK_ALL_SERVERS) {
        await ns.asleep(5000);
        ns.exec(SCRIPT_ATTACK_ALL_SERVERS, SERVER_HOME);
    }
}
