import * as commonLib from "commonLib.js";
import ServerDetailsCollection from "ServerDetailsCollection.js";

let scannedAround = [];
let targetServerDetailsCollection;
let botServerDetailsCollection;

/** @param {import(".").NS } ns */
export async function main(ns) {
    commonLib.disableLogs(ns);

    targetServerDetailsCollection = new ServerDetailsCollection(ns);
    botServerDetailsCollection = new ServerDetailsCollection(ns);

    scanAndGatherTargetAndBotServers(ns, "home");

    let serversToHackCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.getServersForHacking(serversToHackCollection);
    await hacking(ns, botServerDetailsCollection, serversToHackCollection);

    let serversToGrowCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.getServersForGrowing(serversToGrowCollection);
    await growing(ns, botServerDetailsCollection, serversToGrowCollection);

    let serversToWeakenCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.getServersForWeakening(serversToWeakenCollection);
    await weakening(ns, botServerDetailsCollection, serversToWeakenCollection);

    //targetServerDetailsCollection.getByName("iron-gym").testing();

    //targetServerDetailsCollection.sortByDesc("moneyPerGrowThreadsPerSecondsFromBase");
    //targetServerDetailsCollection.sortByDesc("maxMoney");

    // ns.tprint(
    //     targetServerDetailsCollection.debug()
    // );


    scannedAround = [];
    targetServerDetailsCollection = null;
    botServerDetailsCollection = null;
}

/**
 * @param {import(".").NS } ns
 * @param {string} startingServer
 * */
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

        botServerDetailsCollection.addByName(serverName);

        if (ns.getServerMaxMoney(serverName) <= 0) {
            continue;
        }

        targetServerDetailsCollection.addByName(serverName);
    }
}

/**
 * @param {import(".").NS } ns
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } botServerDetailsCollection
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } targetServerDetailsCollection
 */
async function hacking(ns, botServerDetailsCollection, targetServerDetailsCollection) {
    ns.print("Starting: HACKING");
    if (targetServerDetailsCollection.length === 0) {
        ns.print("No Servers to hack");
    }
    while(targetServerDetailsCollection.hasNext()) {
        let targetServer = targetServerDetailsCollection.getNext();
        let execTime = targetServer.hackTime;
        let targetNumOfThreads = Math.ceil(targetServer.hackThreadsToGetAllMoney);

        await handleServer(
            ns,
            targetServer,
            execTime,
            targetNumOfThreads,
            botServerDetailsCollection,
            commonLib.CREATED_SCRIPT_HACK,
            "hack"
        );
    }
}

/**
 * @param {import(".").NS } ns
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } botServerDetailsCollection
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } targetServerDetailsCollection
 */
async function growing(ns, botServerDetailsCollection, targetServerDetailsCollection) {
    ns.print("Starting: GROWING");
    if (targetServerDetailsCollection.length === 0) {
        ns.print("No Servers to grow");
    }
    while(targetServerDetailsCollection.hasNext()) {
        let targetServer = targetServerDetailsCollection.getNext();
        let execTime = targetServer.growTime;
        let targetNumOfThreads = Math.ceil(targetServer.growThreadsToReachMaxMoney);

        await handleServer(
            ns,
            targetServer,
            execTime,
            targetNumOfThreads,
            botServerDetailsCollection,
            commonLib.CREATED_SCRIPT_GROW,
            "grow"
        );
    }
}

/**
 * @param {import(".").NS } ns
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } botServerDetailsCollection
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } targetServerDetailsCollection
 */
async function weakening(ns, botServerDetailsCollection, targetServerDetailsCollection) {
    ns.print("Starting: WEAKENING");
    if (targetServerDetailsCollection.length === 0) {
        ns.print("No Servers to weaken");
    }
    while(targetServerDetailsCollection.hasNext()) {
        let targetServer = targetServerDetailsCollection.getNext();
        let execTime = targetServer.weakenTime;
        let targetNumOfThreads = Math.ceil(targetServer.weakenThreadsToReachMinimumSecurity);

        await handleServer(
            ns,
            targetServer,
            execTime,
            targetNumOfThreads,
            botServerDetailsCollection,
            commonLib.CREATED_SCRIPT_WEAKEN,
            "weaken"
        );
    }
}

/**
 * @param {import(".").NS } ns
 * @param {import("./ServerDetails.js").ServerDetails } targetServer
 * @param {number} execTime
 * @param {number} targetNumOfThreads
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } botServerDetailsCollection
 * @param {string} scriptName
 * @param {string} attackName
 */
async function handleServer(ns, targetServer, execTime, targetNumOfThreads, botServerDetailsCollection, scriptName, attackName) {
    let localBotServerDetailsCollection = botServerDetailsCollection.clone();
    let execRamCost = ns.getScriptRam(scriptName, "home");
    let totalExecRamCost = execRamCost * targetNumOfThreads;
    let currentDate = new Date();
    let execFinishDate = new Date();
    execFinishDate.setTime(currentDate.getTime() + execTime)

    // let debug = {
    //     "name": targetServer.name,
    //     "execTime": ns.tFormat(execTime),
    //     "targetNumOfThreads": targetNumOfThreads,
    //     "execRamCost": execRamCost,
    //     "totalExecRamCost": totalExecRamCost,
    // }
    // ns.print(JSON.stringify(debug, null, 2));
    // ns.print("-----------------------------------------------")
    // ns.print(
    //     ns.sprintf(
    //         "Searching for servers to %s %s (t=%d, %dGB)",
    //         attackName,
    //         targetServer.name,
    //         targetNumOfThreads,
    //         totalExecRamCost
    //     )
    // );
    // ns.print("-----------------------------------------------")

    while (targetNumOfThreads > 0) {
        let currentServer = localBotServerDetailsCollection.getNextServerWithEnoughRam(totalExecRamCost, execRamCost);

        if (currentServer === false || currentServer === null || currentServer === undefined) {
            break;
        }

        let numOfThreads = Math.min(
            currentServer.calculateMaxThreadsForScript(execRamCost),
            targetNumOfThreads
        );
        let currentExecRamCost = numOfThreads * execRamCost;

        ns.print("===============================================")
        ns.print(
            ns.sprintf(
                "Starting %sing script on %s (t=%d, %dGB), target: %s",
                attackName,
                currentServer.name,
                numOfThreads,
                currentExecRamCost,
                targetServer.name
            )
        );

        await currentServer.executeScript(scriptName, numOfThreads, [
            targetServer.name,
            currentDate.toISOString(),
            execFinishDate.toISOString(),
        ]);

        targetNumOfThreads -= numOfThreads;
        totalExecRamCost -= currentExecRamCost;
    }
}