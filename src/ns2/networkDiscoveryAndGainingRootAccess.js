import * as CONSTANTS from "lib_constants.js";

let alreadyCompletedScanAroundServers;
let canHackThisManyPorts;

/** @param {import(".").NS } ns */
export async function main(ns) {
    alreadyCompletedScanAroundServers = [];
    calculateNumberOfOpenablePorts(ns);
    networkDiscoveryAndGainingRootAccessAroundServer(ns, CONSTANTS.SERVER_HOME);
}

/** @param {import(".").NS } ns */
function calculateNumberOfOpenablePorts(ns) {
    canHackThisManyPorts = 0;
    for (let i = 0 ; i < CONSTANTS.PROGRAM_NAMES.length ; i++) {
        let programName = CONSTANTS.PROGRAM_NAMES[i];
        if (ns.fileExists(programName)) {
            canHackThisManyPorts++;
        }
    }

}

/**
 * @param {import(".").NS } ns
 * @param {string} targetServer
 */
function networkDiscoveryAndGainingRootAccessAroundServer(ns, targetServer) {
    if (alreadyCompletedScanAroundServers.includes(targetServer)) {
        return;
    }
    alreadyCompletedScanAroundServers.push(targetServer);

    let scannedServers = ns.scan(targetServer);

    if (scannedServers.length) {
        scannedServers.forEach(function(scannedServer){
            handleScannedServer(ns, scannedServer);
        });
    }
}

/**
 * @param {import(".").NS } ns
 * @param {string} scannedServer
 */
function handleScannedServer(ns, scannedServer) {
    networkDiscoveryAndGainingRootAccessAroundServer(ns, scannedServer);
    if (!isServerReadyToBeBrokenOpen(ns, scannedServer)) {
        return;
    }

    gainRootAccessOnServer(ns, scannedServer);
    ns.toast(ns.sprintf("*** GAINED ROOT ACCESS TO A NEW SERVER: %s ***", scannedServer));
}

/**
 * @param {import(".").NS } ns
 * @param {string} serverName
 */
function isServerReadyToBeBrokenOpen(ns, serverName) {
    return !(serverName === CONSTANTS.SERVER_HOME
        || ns.hasRootAccess(serverName)
        || ns.getServerRequiredHackingLevel(serverName) > ns.getHackingLevel()
        || ns.getServerNumPortsRequired(serverName) > canHackThisManyPorts);
}

/**
 * @param {import(".").NS } ns
 * @param {string} serverName
 */
function gainRootAccessOnServer(ns, serverName) {
    if (ns.fileExists(CONSTANTS.PROGRAM_BRUTESSH, CONSTANTS.SERVER_HOME)) {
        ns.brutessh(serverName);
    }
    if (ns.fileExists(CONSTANTS.PROGRAM_FTPCRACK, CONSTANTS.SERVER_HOME)) {
        ns.ftpcrack(serverName);
    }
    if (ns.fileExists(CONSTANTS.PROGRAM_RELAYSMTP, CONSTANTS.SERVER_HOME)) {
        ns.relaysmtp(serverName);
    }
    if (ns.fileExists(CONSTANTS.PROGRAM_HTTPWORM, CONSTANTS.SERVER_HOME)) {
        ns.httpworm(serverName);
    }
    if (ns.fileExists(CONSTANTS.PROGRAM_SQLINJECT, CONSTANTS.SERVER_HOME)) {
        ns.sqlinject(serverName);
    }

    ns.nuke(serverName);
}