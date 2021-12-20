import ServerDetailsCollection from "ServerDetailsCollection.js";

let scannedAround = [];
let targetServerDetailsCollection;
let botServerDetailsCollection;

/** @param {import(".").NS } ns */
export async function main(ns) {
    targetServerDetailsCollection = new ServerDetailsCollection(ns);
    botServerDetailsCollection = new ServerDetailsCollection(ns);

    scanAndGatherTargetAndBotServers(ns, "home");
    
    let serversToHackCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.getServersForHacking(serversToHackCollection);
    let serversToGrowCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.getServersForGrowing(serversToGrowCollection);
    let serversToWeakenCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.getServersForWeakening(serversToWeakenCollection);

    ns.tprint("serversToHackCollection.debug()");
    ns.tprint(serversToHackCollection.debug());

    ns.tprint("serversToGrowCollection.debug()");
    ns.tprint(serversToGrowCollection.debug());

    serversToWeakenCollection.limit(5);
    ns.tprint("serversToWeakenCollection.debug()");
    ns.tprint(serversToWeakenCollection.debug());



    //targetServerDetailsCollection.getByName("iron-gym").testing();

    /*
    targetServerDetailsCollection.sortByDesc("moneyPerGrowThreadsPerSecondsFromBase");
    
    targetServerDetailsCollection.sortByDesc("maxMoney");
    ns.tprint(
        targetServerDetailsCollection.debug()
    );
    */
}

function scanAndGatherTargetAndBotServers(ns, startingServer) {
    if (scannedAround.includes(startingServer)) {
        return;
    }
    scannedAround.push(startingServer);

    let scannedServers = ns.scan(startingServer);
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