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

    for (let i = 0 ; i < scannedServers.length ; i++) {
        let scannedServer = scannedServers[i];
        if (parent === scannedServer) {
            continue;
        }
        nestedServers[scannedServer] = getNestedServersList(ns, scannedServer, startServer);
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
/** @param {import(".").NS } ns
 * @param {string} programName
 * @return {boolean}
 */
export function isProgramAvailable(ns, programName) {
    return ns.fileExists(programName, "home");
}

export const findPath = (ob, key) => {
    const path = [];
    const keyExists = (obj) => {
        if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
            return false;
        }
        else if (obj.hasOwnProperty(key)) {
            return true;
        }
        else if (Array.isArray(obj)) {
            let parentKey = path.length ? path.pop() : "";

            for (let i = 0; i < obj.length; i++) {
                path.push(`${parentKey}[${i}]`);
                const result = keyExists(obj[i], key);
                if (result) {
                    return result;
                }
                path.pop();
            }
        }
        else {
            for (const k in obj) {
                path.push(k);
                const result = keyExists(obj[k], key);
                if (result) {
                    return result;
                }
                path.pop();
            }
        }
        return false;
    };

    keyExists(ob);

    return path;
}

/** @param {import(".").NS } ns
 * @param {string} targetServerName
 * @return {string[]}
 */
export function getPathToServer(ns, targetServerName) {
    let path = findPath(getNestedServersList(ns), targetServerName);
    path.push(targetServerName);

    return path;
}