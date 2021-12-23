export const CREATED_SCRIPT_GROW = "grow.script";
export const CREATED_SCRIPT_WEAKEN = "weaken.script";
export const CREATED_SCRIPT_HACK = "hack.script";

export const CREATED_SCRIPTS = [
    CREATED_SCRIPT_GROW,
    CREATED_SCRIPT_WEAKEN,
    CREATED_SCRIPT_HACK,
]

/** @param {import(".").NS } ns */
export function testLib(ns) {
    ns.alert("CommonLib works like a magic!");
}

/** @param {import(".").NS } ns
 * @param {string} scriptName
 * @param {string} targetServer
 */
export function execScript(ns, scriptName, targetServer) {
    let scriptRam = ns.getScriptRam(scriptName, targetServer);
    let serverAvailableRam = ns.getServerMaxRam -ns.getServerUsedRam;
    if (scriptRam > serverAvailableRam) {
        ns.alert(ns.sprintf("Cannot run script %s on server %s, %d / %d", scriptName, targetServer, scriptRam, serverAvailableRam));
        return;
    }

    ns.exec(scriptName, targetServer);
}

/** @param {import(".").NS } ns */
export function disableLogs(ns) {
    ns.disableLog("wget");
    ns.disableLog("getServerMaxMoney");
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("getServerSecurityLevel");
    ns.disableLog("getServerMinSecurityLevel");
    ns.disableLog("getServerMaxRam");
    ns.disableLog("getServerUsedRam");
    ns.disableLog("scan");
    ns.disableLog("asleep");
    ns.disableLog("scp");
    ns.disableLog("exec");

    ns.clearLog();
}

/** @param {import(".").NS } ns */
export function getServersList(ns) {
    let servers = ["home"];

    for (let i = 0 ; i < servers.length ; i++) {
        let scannedServers = ns.scan(servers[i]);

        for (let j = 0 ; j < scannedServers.length ; j++) {
            let scannedServer = scannedServers[j];
            if (!servers.includes(scannedServer)) {
                servers.push(scannedServer);
            }
        }
    }
    return servers;
}

/** @param {import(".").NS } ns */
export function getRootServersList(ns) {
    let allServers = getServersList(ns);
    let servers = [];

    for (let i = 0 ; i < allServers.length ; i++) {
        let serverName = allServers[i];
        if (ns.hasRootAccess(serverName)) {
            servers.push(serverName);
        }
    }

    return servers;
}

/**
 * @param {import(".").NS } ns
 * @param {string} startServer
 * @param {string} parent
 * */
export function getNestedServersList(ns, startServer, parent) {
    if (startServer === undefined) {
        startServer = "home";
    }

    let scannedServers = ns.scan(startServer);
    let nestedServers = {};
    nestedServers[startServer] = [];

    for (let i = 0 ; i < scannedServers.length ; i++) {
        let scannedServer = scannedServers[i];
        if (parent === scannedServer) {
            continue;
        }
        nestedServers[startServer].push(getNestedServersList(ns, scannedServer, startServer));
    }
    return nestedServers;
}

/**
 * @param {import(".").NS } ns
 * @param {any} msg
 * @param {number} indent
 * */
export function sexyPrintObject(ns, msg, indent = 0) {
    let output = "";

    if (indent > 0) {
        for (let i = 0 ; i < indent ; i++) {
            if (i === 0) {
                output += "|-";
            } else {
                output += "--";
            }
        }
    }

    if (msg instanceof Date) {
        ns.tprint(output + msg.toISOString());
    } else if (typeof msg === "string") {
        ns.tprint(output + msg);
    } else if (Array.isArray(msg)) {
        for (let j = 0 ; j < msg.length ; j++) {
            sexyPrintObject(ns, msg[j], indent+1);
        }
    } else if (typeof msg === "object" && msg) {
        let objectKeys = Object.keys(msg);

        for (let j = 0 ; j < objectKeys.length ; j++) {
            let objectKey = objectKeys[j];
            if (typeof msg[objectKey] !== "object" || !msg[objectKey]) {
                ns.tprint(output + objectKey + ": " + msg[objectKey]);
            } else {
                ns.tprint(output + objectKey + ":");
            }

            if (Array.isArray(msg[objectKey])) {
                for (let k = 0 ; k < msg[objectKey].length ; k++) {
                    sexyPrintObject(ns, msg[objectKey][k], indent+1);
                }
            } else if (typeof msg[objectKey] === "object" && msg[objectKey]) {
                sexyPrintObject(ns, msg[objectKey], indent+1);
            }

        }
    }
}

/** @param {import(".").NS } ns */
export function getTargetGroupedServerProcesses(ns) {
    let targetGroupedServerProcesses = {};
    let rootServers = getRootServersList(ns);
    for (let i = 0 ; i < rootServers.length ; i++) {
        let rootServer = rootServers[i];
        let serverProcesses = ns.ps(rootServer);
        if (serverProcesses.length) {
            for (let j = 0 ; j < serverProcesses.length ; j++) {
                let serverProcess = serverProcesses[j];
                let fileName = serverProcess.filename;
                let threads = serverProcess.threads;
                let args = serverProcess.args;
                if (args.length === 3) {
                    let targetServer = args[0];
                    // let execStart = new Date(args[1]);
                    let execEnd = new Date(args[2]);
                    if (!(targetServer in targetGroupedServerProcesses)) {
                        targetGroupedServerProcesses[targetServer] = {};
                    }
                    if (!(fileName in targetGroupedServerProcesses[targetServer])) {
                        targetGroupedServerProcesses[targetServer][fileName] = {
                            "threads": 0,
                            "attackers": [],
                            "lastAttackFinishesAt": new Date(),
                        }
                    }


                    targetGroupedServerProcesses[targetServer][fileName].threads += threads;
                    if (!targetGroupedServerProcesses[targetServer][fileName].attackers.includes(rootServer)) {
                        targetGroupedServerProcesses[targetServer][fileName].attackers.push(rootServer);
                    }
                    if (execEnd.getTime() > targetGroupedServerProcesses[targetServer][fileName].lastAttackFinishesAt.getTime()) {
                        targetGroupedServerProcesses[targetServer][fileName].lastAttackFinishesAt = execEnd;
                    }
                }
            }
        }
    }

    return targetGroupedServerProcesses;
}