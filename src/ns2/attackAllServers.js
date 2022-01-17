import * as CONSTANTS from "lib_constants.js";
import {getRootServersList} from "lib_rootServerList.js";
import {getTargetGroupedServerProcesses} from "lib_targetGroupedServerProcesses.js";
import {getServersList} from "lib_serverList.js";

import ServerDetailsCollection from "ServerDetailsCollection.js";
import ServerDetails from "ServerDetails.js";

let targetServerDetailsCollection;
let botServerDetailsCollection;
let rootServers;

/** @param {import(".").NS } ns */
export async function main(ns) {
    await prepareScripts(ns);

    rootServers = getRootServersList(ns, getServersList(ns));
    targetServerDetailsCollection = new ServerDetailsCollection(ns);
    botServerDetailsCollection = new ServerDetailsCollection(ns);
    if (ns.getServerMaxRam(CONSTANTS.SERVER_HOME) > 128) {
        botServerDetailsCollection.add(new ServerDetails(ns, CONSTANTS.SERVER_HOME));
    }

    scanAndGatherTargetAndBotServers(ns, botServerDetailsCollection, targetServerDetailsCollection);

    let serversToHackCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.clone().getServersForHacking(serversToHackCollection);
    await hacking(ns, botServerDetailsCollection, serversToHackCollection);

    let serversToGrowCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.clone().getServersForGrowing(serversToGrowCollection);
    await growing(ns, botServerDetailsCollection, serversToGrowCollection);

    let serversToWeakenCollection = new ServerDetailsCollection(ns);
    targetServerDetailsCollection.clone().getServersForWeakening(serversToWeakenCollection);
    await weakening(ns, botServerDetailsCollection, serversToWeakenCollection);

    removeScripts(ns);
}

/** @param {import(".").NS } ns */
async function prepareScripts(ns) {
    await ns.write(CONSTANTS.CREATED_SCRIPTS[0], "grow(args[0])", "w");
    await ns.write(CONSTANTS.CREATED_SCRIPTS[1], "weaken(args[0])", "w");
    await ns.write(CONSTANTS.CREATED_SCRIPTS[2], "hack(args[0])", "w");
}

function removeScripts(ns) {
    ns.rm(CONSTANTS.CREATED_SCRIPTS[0]);
    ns.rm(CONSTANTS.CREATED_SCRIPTS[1]);
    ns.rm(CONSTANTS.CREATED_SCRIPTS[2]);
}

/**
 * @param {import(".").NS } ns
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } botServerDetailsCollection
 * @param {import("./ServerDetailsCollection.js").ServerDetailsCollection } targetServerDetailsCollection
 * */
function scanAndGatherTargetAndBotServers(ns, botServerDetailsCollection, targetServerDetailsCollection) {
    let rootServers = getRootServersList(ns, getServersList(ns));

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
    if (targetServerDetailsCollection.length === 0) {
        return;
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
            CONSTANTS.CREATED_SCRIPT_HACK,
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
    if (targetServerDetailsCollection.length === 0) {
        return;
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
            CONSTANTS.CREATED_SCRIPT_GROW,
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
    if (targetServerDetailsCollection.length === 0) {
        return;
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
            CONSTANTS.CREATED_SCRIPT_WEAKEN,
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
    let targetGroupedServerProcesses = getTargetGroupedServerProcesses(ns, rootServers);

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