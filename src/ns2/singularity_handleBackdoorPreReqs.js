import * as CONSTANTS from "lib_constants.js";
import {getRootServersList} from "./lib_rootServerList";
import {getServersList} from "./lib_serverList";
import {getPathToServer} from "./lib_pathToServer";
import {getNestedServersList} from "./lib_nestedServerList";

/** @param {import(".").NS } ns */
export async function main(ns) {
    let backdoorFactions = Object.keys(CONSTANTS.FACTIONS_SERVER_BACKDOOR_REQUIREMENTS);
    let rootServers = getRootServersList(ns, getServersList(ns));
    let nestedServers = getNestedServersList(ns);

    for (let i = 0 ; i < backdoorFactions.length ; i++) {
        let factionName = backdoorFactions[i];
        let targetServer = CONSTANTS.FACTIONS_SERVER_BACKDOOR_REQUIREMENTS[factionName];


        if (
            ns.getPlayer().factions.includes(factionName)
            || !rootServers.includes(targetServer)
        ) {
            continue;
        }

        let pathToServer = getPathToServer(targetServer, nestedServers);
        for (let i = 0; i < pathToServer.length; i++) {
            ns.connect(pathToServer[i]);
        }
        await ns.installBackdoor();
        ns.connect("home");
    }
}