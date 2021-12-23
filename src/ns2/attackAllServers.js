import * as commonLib from "commonLib.js";
import ServerDetailsCollection from "ServerDetailsCollection.js";
import ServerDetails from "ServerDetails.js";

let targetServerDetailsCollection;
let botServerDetailsCollection;

/** @param {import(".").NS } ns */
export async function main(ns) {
    commonLib.disableLogs(ns);
    ns.toast("Starting attacks on all servers", "info");

    targetServerDetailsCollection = new ServerDetailsCollection(ns);
    botServerDetailsCollection = new ServerDetailsCollection(ns);
    botServerDetailsCollection.add(new ServerDetails(ns, "home"));

    scanAndGatherTargetAndBotServers(ns, botServerDetailsCollection, targetServerDetailsCollection);



    let serversToHackCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.clone().getServersForHacking(serversToHackCollection);
    //serversToHackCollection.addByName("iron-gym");
    await hacking(ns, botServerDetailsCollection, serversToHackCollection);

    let serversToGrowCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.clone().getServersForGrowing(serversToGrowCollection);
    // serversToGrowCollection.addByName("iron-gym");
    await growing(ns, botServerDetailsCollection, serversToGrowCollection);

    let serversToWeakenCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.clone().getServersForWeakening(serversToWeakenCollection);
    //serversToWeakenCollection.addByName("iron-gym");
    await weakening(ns, botServerDetailsCollection, serversToWeakenCollection);
}

/**
 * @param {import(".").NS } ns
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } botServerDetailsCollection
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } targetServerDetailsCollection
 * */
function scanAndGatherTargetAndBotServers(ns, botServerDetailsCollection, targetServerDetailsCollection) {
    let rootServers = commonLib.getRootServersList(ns);

    for (let i = 0 ; i < rootServers.length ; i++) {
        let currentServerName = rootServers[i];
        botServerDetailsCollection.addByName(currentServerName);
        if (ns.getServerMaxMoney(currentServerName) > 0) {
            targetServerDetailsCollection.addByName(currentServerName);
        }
    }
}

/**
 * @param {import(".").NS } ns
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } botServerDetailsCollection
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } targetServerDetailsCollection
 */
async function hacking(ns, botServerDetailsCollection, targetServerDetailsCollection) {
    ns.print("===============================================")
    ns.print("Starting: HACKING");
    if (targetServerDetailsCollection.length === 0) {
        ns.print("No Servers to hack");
    }
    while(targetServerDetailsCollection.hasNext()) {
        let targetServer = targetServerDetailsCollection.getNext();
        let execTime = targetServer.hackTime;
        let targetNumOfThreads = Math.ceil(targetServer.hackThreadsToGetAllMoney);

        await attackServer(
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
    ns.print("===============================================")
    ns.print("Starting: GROWING");
    if (targetServerDetailsCollection.length === 0) {
        ns.print("No Servers to grow");
    }
    while(targetServerDetailsCollection.hasNext()) {
        let targetServer = targetServerDetailsCollection.getNext();
        let execTime = targetServer.growTime;
        let targetNumOfThreads = Math.ceil(targetServer.growThreadsToReachMaxMoney);

        await attackServer(
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
    ns.print("===============================================")
    ns.print("Starting: WEAKENING");
    if (targetServerDetailsCollection.length === 0) {
        ns.print("No Servers to weaken");
    }
    while(targetServerDetailsCollection.hasNext()) {
        let targetServer = targetServerDetailsCollection.getNext();
        let execTime = targetServer.weakenTime;
        let targetNumOfThreads = Math.ceil(targetServer.weakenThreadsToReachMinimumSecurity);

        await attackServer(
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
async function attackServer(ns, targetServer, execTime, targetNumOfThreads, botServerDetailsCollection, scriptName, attackName) {
    let targetGroupedServerProcesses = commonLib.getTargetGroupedServerProcesses(ns);

    if (targetServer.name in targetGroupedServerProcesses && scriptName in targetGroupedServerProcesses[targetServer.name]) {
        targetNumOfThreads -= targetGroupedServerProcesses[targetServer.name][scriptName].threads;
    }

    if (targetNumOfThreads <= 0) {
        return;
    }

    let localBotServerDetailsCollection = botServerDetailsCollection.clone();
    let execRamCost = ns.getScriptRam(scriptName, "home");
    let totalExecRamCost = execRamCost * targetNumOfThreads;
    let currentDate = new Date();
    let execFinishDate = new Date();
    execFinishDate.setTime(currentDate.getTime() + execTime)

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