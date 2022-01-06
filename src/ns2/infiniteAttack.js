const SCRIPT_ATTACK_ALL_SERVERS = "attackAllServers.js";
const SERVER_HOME = "home";

/** @param {NS} ns **/
export async function main(ns) {
    while(true) {
        if (
            !ns.scriptRunning(SCRIPT_ATTACK_ALL_SERVERS, SERVER_HOME)
            && !ns.scriptRunning("dispatcher.js", SERVER_HOME)
        ) {
            ns.exec(SCRIPT_ATTACK_ALL_SERVERS, SERVER_HOME);
        }

        await ns.asleep(100);
    }
}