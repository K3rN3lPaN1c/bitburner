import * as commonLib from "commonLib.js";

const SERVER_HOME = "home";
const SCRIPT_NETWORK_DISCOVERY = "network_discovery_and_gaining_root_access.js";
const SCRIPT_TEST_HACK = "testHack.js";
const SCRIPT_COLLECT = "collectServerDetails.js";
// const SCRIPT_NAME_TEMPLATE = "early-hack-template%d.script";

//const FILES_BASE_URL = "https://raw.githubusercontent.com/K3rN3lPaN1c/bitburner/feature/kuvee-ns-scripts/src/ns2/";
const FILES_BASE_URL = "file:///C:/Bitburner/bitburner/src/ns2/";

const FILES_TO_DOWNLOAD = [
    "ServerDetails.js",
    "ServerDetailsCollection.js",
    SCRIPT_COLLECT,
    "formulasLib.js",
    "downloadFiles.js",
    SCRIPT_TEST_HACK,
    SCRIPT_NETWORK_DISCOVERY,
];

const RUN_NETWORK_DISCOVERY = false;
// const RUN_AUTO_START_LOCAL_HACKS = false;
const RUN_KEEP_INIT_RUNNING = true;
const RUN_TEST_HACK = false;
const RUN_COLLECT = true;

// let redeploy_happened = false;

// const baseTargetServers = [
//     "n00dles",
//     "harakiri-sushi",
//     "phantasy",
//     "rho-construction",
//     "clarkinc",
//     "megacorp",
//     "b-and-a",
//     "4sigma",
//     "omnitek",
//     "kuai-gong",
//     "nwo",
//     "blade",
//     "global-pharm",
//     "zb-def",
//     "nova-med",
//     "the-hub",
//     "zeus-med",
//     "unitalife",
// ];

/** @param {import(".").NS } ns */
export async function main(ns) {
    ns.disableLog("asleep");

    await downloadAllFiles(ns);
    await prepareScripts(ns);

    networkDiscovery(ns);
    // autoStartLocalHacks(ns);

    if (RUN_TEST_HACK) {
        ns.exec(SCRIPT_TEST_HACK, SERVER_HOME);
    }
    if (RUN_COLLECT) {
        ns.exec(SCRIPT_COLLECT, SERVER_HOME);
        ns.tail(SCRIPT_COLLECT, SERVER_HOME);
    }

    while (RUN_KEEP_INIT_RUNNING) {
        await ns.asleep(1000);
    }
}

/** @param {import(".").NS } ns */
async function networkDiscovery(ns) {
    while (RUN_NETWORK_DISCOVERY) {
        await ns.asleep(10000);
        ns.exec(SCRIPT_NETWORK_DISCOVERY, SERVER_HOME);
    }
}

/** @param {import(".").NS } ns */
// async function autoStartLocalHacks(ns) {
//     while(RUN_AUTO_START_LOCAL_HACKS){
//         await ns.asleep(10000);
//
//         for (let i = 0 ; i < baseTargetServers.length; i++) {
//             let targetServer = baseTargetServers[i];
//             let scriptName = ns.sprintf(SCRIPT_NAME_TEMPLATE, i+1);
//             let availableRam = ns.getServerMaxRam(SERVER_HOME)-ns.getServerUsedRam(SERVER_HOME);
//             let numOfThreads = Math.min(10000, Math.floor(availableRam/ns.getScriptRam(scriptName, SERVER_HOME)) - 5);
//
//             if (
//                 !ns.isRunning(scriptName, SERVER_HOME)
//                 && ns.hasRootAccess(targetServer)
//                 && numOfThreads > 0
//             ) {
//                 ns.exec(scriptName, SERVER_HOME, numOfThreads);
//             }
//         }
//
//         if (ns.hasRootAccess("ecorp") && !redeploy_happened) {
//             ns.exec("redeploy-to-outer-servers.script", SERVER_HOME);
//             redeploy_happened = true;
//         }
//     }
// }

/** @param {import(".").NS } ns */
async function downloadAllFiles(ns) {
    //ns.disableLog("wget");
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