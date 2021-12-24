import * as commonLib from "commonLib.js";

const SERVER_HOME = "home";
const SCRIPT_DISPATCHER = "dispatcher.js";
const SCRIPT_NETWORK_DISCOVERY = "networkDiscoveryAndGainingRootAccess.js";
const SCRIPT_ATTACK_ALL_SERVERS = "attackAllServers.js";
const SCRIPT_MANAGE_PURCHASED_SERVERS = "managePurchasedServers.js";
const SCRIPT_GANG_MANAGEMENT = "gangManagement.js";

//const FILES_BASE_URL = "https://raw.githubusercontent.com/K3rN3lPaN1c/bitburner/feature/kuvee-ns-scripts/src/ns2/";
const FILES_BASE_URL = "file:///C:/Bitburner/bitburner/src/ns2/";

const FILES_TO_DOWNLOAD = [
    SCRIPT_DISPATCHER,
    SCRIPT_ATTACK_ALL_SERVERS,
    SCRIPT_NETWORK_DISCOVERY,
    SCRIPT_MANAGE_PURCHASED_SERVERS,
    SCRIPT_GANG_MANAGEMENT,

    "init.js",
    "showServerMap.js",
    "ServerDetails.js",
    "ServerDetailsCollection.js",
];

const ENABLE_NETWORK_DISCOVERY = true;
const ENABLE_KEEP_DISPATCHER_RUNNING = true;
const ENABLE_ATTACK_ALL_SERVERS = true;
const ENABLE_PURCHASED_SERVERS_MANAGER = true;
const ENABLE_GANG_MANAGEMENT = false;

/** @param {import(".").NS } ns */
export async function main(ns) {
    commonLib.disableLogs(ns);

    await downloadAllFiles(ns);
    await prepareScripts(ns);

    manageGangs(ns);
    networkDiscovery(ns);
    attackAllServers(ns);
    managePurchasedServers(ns);

    if (ENABLE_KEEP_DISPATCHER_RUNNING) {
        ns.spawn(SCRIPT_DISPATCHER);
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
function networkDiscovery(ns) {
    if (ENABLE_NETWORK_DISCOVERY) {
        ns.exec(SCRIPT_NETWORK_DISCOVERY, SERVER_HOME);
    } else {
        ns.toast("No network discovery!", "warning");
    }
}


/** @param {import(".").NS } ns */
function attackAllServers(ns) {
    if (ENABLE_ATTACK_ALL_SERVERS) {
        ns.exec(SCRIPT_ATTACK_ALL_SERVERS, SERVER_HOME);
    } else {
        ns.toast("No attack all servers!", "warning");
    }
}

/** @param {import(".").NS } ns */
function managePurchasedServers(ns) {
    if (ENABLE_PURCHASED_SERVERS_MANAGER) {
        ns.exec(SCRIPT_MANAGE_PURCHASED_SERVERS, SERVER_HOME);
    } else {
        ns.toast("No purchased server management!", "warning");
    }
}

/** @param {import(".").NS } ns */
function manageGangs(ns) {
    if (ENABLE_GANG_MANAGEMENT && ns.gang.inGang()) {
        ns.exec(SCRIPT_GANG_MANAGEMENT, SERVER_HOME);
    } else {
        ns.toast("No gang management!", "warning");
    }
}
