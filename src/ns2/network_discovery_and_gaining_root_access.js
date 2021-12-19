const server_home = "home";

const program_bruteSSH = "BruteSSH.exe";
const program_FTPCrack = "FTPCrack.exe";
const program_relaySMTP = "relaySMTP.exe";
const program_HTTPWorm = "HTTPWorm.exe";
const program_SQLInject = "SQLInject.exe";

const program_names = [
    program_bruteSSH,
    program_FTPCrack,
    program_relaySMTP,
    program_HTTPWorm,
    program_SQLInject
];

var alreadyCompletedScanAroundServers;
var canHackThisManyPorts;

/** @param {NS} ns **/
export async function main(ns) {
    //ns.tprint("Starting automatic network discovery and gaining root access to foreign servers.");
    resetConfigVariables(ns);
    disableLogForFunctionsUsed(ns);
    networkDiscoveryAndGainingRootAccessAroundServer(ns, server_home);
}

/** @param {NS} ns **/
function disableLogForFunctionsUsed(ns) {
    ns.disableLog("disableLog");
    ns.disableLog("scan");
    ns.disableLog("getHackingLevel");
    ns.disableLog("getServerRequiredHackingLevel");
    ns.disableLog("getServerNumPortsRequired");
}

/** @param {NS} ns **/
function resetConfigVariables(ns) {
    alreadyCompletedScanAroundServers = [];
    
    calculateNumberOfOpenablePorts(ns);
}

/** @param {NS} ns **/
function calculateNumberOfOpenablePorts(ns) {
    canHackThisManyPorts = 0;
    program_names.forEach(function(program_name){
        if (ns.fileExists(program_name)) {
            canHackThisManyPorts++;
        }
    });
}

/** @param {NS} ns **/
function networkDiscoveryAndGainingRootAccessAroundServer(ns, targetServer) {
    if (alreadyCompletedScanAroundServers.includes(targetServer)) {
        return;
    }
    alreadyCompletedScanAroundServers.push(targetServer);

    var scannedServers = ns.scan(targetServer);

    if (scannedServers.length) {
        scannedServers.forEach(function(scannedServer){
            handleScannedServer(ns, scannedServer);
        });
    }
}

/** @param {NS} ns **/
function handleScannedServer(ns, scannedServer) {
    networkDiscoveryAndGainingRootAccessAroundServer(ns, scannedServer);
    if (!isServerReadyToBeBrokenOpen(ns, scannedServer)) {
        return;
    }

    gainRootAccessOnServer(ns, scannedServer);
    ns.tprintf("*** GAINED ROOT ACCESS TO A NEW SERVER: %s ***", scannedServer);
}

/** @param {NS} ns **/
function isServerReadyToBeBrokenOpen(ns, serverName) {
    if (
        serverName === server_home
        || ns.hasRootAccess(serverName)
        || ns.getServerRequiredHackingLevel(serverName) > ns.getHackingLevel()
        || ns.getServerNumPortsRequired(serverName) > canHackThisManyPorts
    ) {
        return false;
    }

    return true;
}

/** @param {NS} ns **/
function gainRootAccessOnServer(ns, serverName) {
    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(serverName);
    }
    if (ns.fileExists("FTPCrack.exe")) {
        ns.ftpcrack(serverName);
    };
    if (ns.fileExists("relaySMTP.exe")) {
        ns.relaysmtp(serverName);
    };
    if (ns.fileExists("HTTPWorm.exe")) {
        ns.httpworm(serverName);
    };
    if (ns.fileExists("SQLInject.exe")) {
        ns.sqlinject(serverName);
    };

    ns.nuke(serverName);
}