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