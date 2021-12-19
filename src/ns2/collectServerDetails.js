import ServerDetailsCollection from "ServerDetailsCollection.js";

var scannedAround = [];
var targetServerDetailsCollection;
var botServerDetailsCollection;

/** @param {import(".").NS } ns */
export async function main(ns) {
    targetServerDetailsCollection = new ServerDetailsCollection(ns);
    botServerDetailsCollection = new ServerDetailsCollection(ns);

    scanAndGatherTargetAndBotServers(ns, "home");

    //targetServerDetailsCollection.getByName("iron-gym").testing();

    targetServerDetailsCollection.sortByDesc("moneyPerGrowThreadsPerSeconds");
    ns.tprint(
        targetServerDetailsCollection.debug()
    );
    targetServerDetailsCollection.sortByDesc("maxMoney");
    ns.tprint(
        targetServerDetailsCollection.debug()
    );
}

function scanAndGatherTargetAndBotServers(ns, startingServer) {
    if (scannedAround.includes(startingServer)) {
        return;
    }
    scannedAround.push(startingServer);

    var scannedServers = ns.scan(startingServer);
    for (let i = 0; i < scannedServers.length; i++) {
        let serverName = scannedServers[i];
        scanAndGatherTargetAndBotServers(ns, serverName);

        if (!ns.hasRootAccess(serverName)) {
            continue;
        }
        
        botServerDetailsCollection.add(serverName);

        if (ns.getServerMaxMoney(serverName) <= 0) {
            continue;
        }
        targetServerDetailsCollection.add(serverName);

    }
}