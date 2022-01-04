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