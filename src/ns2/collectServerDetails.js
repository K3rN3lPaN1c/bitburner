import ServerDetailsCollection from "ServerDetailsCollection.js";

/** @param {import(".").NS } ns */
export async function main(ns) {
    var scannedServers = ns.scan("home");
    var targetServerDetailsCollection = new ServerDetailsCollection(ns);
    var botServerDetailsCollection = new ServerDetailsCollection(ns);

    for (let i = 0; i < scannedServers.length; i++) {
        let serverName = scannedServers[i];

        if (!ns.hasRootAccess(serverName)) {
            continue;
        }
        
        botServerDetailsCollection.add(serverName);

        if (ns.getServerMaxMoney(serverName) <= 0) {
            continue;
        }
        targetServerDetailsCollection.add(serverName);

    }

    //targetServerDetailsCollection.getByName("iron-gym").testing();

    ns.tprint(
        targetServerDetailsCollection.debug()
    );
    targetServerDetailsCollection.sortByDesc("moneyPerGrowThreadsPerSeconds");
    ns.tprint(
        targetServerDetailsCollection.debug()
    );
}