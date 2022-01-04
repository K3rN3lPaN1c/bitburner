import * as CONSTANTS from "lib_constants.js";
import {getServersList} from "./lib_serverList";
import {getPathToServer} from "./lib_pathToServer";
import {getNestedServersList} from "./lib_nestedServerList";

/** @param {import(".").NS } ns */
export async function main(ns) {
    if (getServersList(ns).includes(CONSTANTS.SERVER_WORLD_DAEMON)) {
        let wdRequiredHackLevel = ns.getServerRequiredHackingLevel(CONSTANTS.SERVER_WORLD_DAEMON);
        if (ns.getHackingLevel() < wdRequiredHackLevel) {
            ns.toast(CONSTANTS.SERVER_WORLD_DAEMON + " is on the horizon. " + wdRequiredHackLevel + " levels of hack needed to escape!");
        } else if (!ns.hasRootAccess(CONSTANTS.SERVER_WORLD_DAEMON)) {
            ns.toast("No root access for " + CONSTANTS.SERVER_WORLD_DAEMON + " yet :(", "error");
        } else {
            let pathToServer = getPathToServer(CONSTANTS.SERVER_WORLD_DAEMON, getNestedServersList(ns));

            for (let i = 0; i < pathToServer.length; i++) {
                ns.connect(pathToServer[i]);
            }
            await ns.installBackdoor();

            ns.exit();
        }
    }
}