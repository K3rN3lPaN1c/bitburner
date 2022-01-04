/** @param {import(".").NS } ns
 * @param {string[]} allServers
 */
export function getRootServersList(ns,allServers) {
    let servers = [];

    for (let i = 0 ; i < allServers.length ; i++) {
        let serverName = allServers[i];
        if (ns.hasRootAccess(serverName)) {
            servers.push(serverName);
        }
    }

    return servers;
}