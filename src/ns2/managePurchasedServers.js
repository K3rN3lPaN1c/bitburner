const defaultRamOfServers = 8;
const multiplierOfRamOfServers = 4;
const purchaseSafetyMarginMultiplier = 1;
const maxRamOfServers = 8192;

const serverNamePrefix = "kuvee-server";

/** @param {import(".").NS } ns */
export async function main(ns) {
    // ns.toast("Starting purchased server management", "info");
    let currentRamOfServers = getHighestRamOfActiveServers(ns);

    let highestBuyableRamOfServers = getHighestBuyableRamOfServers(ns, currentRamOfServers);
    if (highestBuyableRamOfServers > currentRamOfServers) {
        destoryAllMyServers(ns);
        buyAllServersWithRam(ns, serverNamePrefix, highestBuyableRamOfServers);
        ns.toast(ns.sprintf(
            "Replaced %dGB servers to shiny new %dGB! Yay!",
            currentRamOfServers,
            highestBuyableRamOfServers
        ));
    }
}

/** @param {import(".").NS } ns */
function getHighestRamOfActiveServers(ns) {
    let highestRam = 0;
    let pattern = /(\d+)GB/;
    let purchasedServers = ns.getPurchasedServers();

    if (purchasedServers.length) {
        for (let i = 0 ; i < purchasedServers.length ; i++) {
            let purchasedServer = purchasedServers[i];
            let rMatch = purchasedServer.match(pattern);
            if (rMatch) {
                highestRam = Math.max(highestRam, rMatch[1]);
            }
        }
    }

    return highestRam;
}

/** @param {import(".").NS } ns
 * @param {number} currentRamOfServers
 */
function getHighestBuyableRamOfServers(ns, currentRamOfServers) {
    let ramOfServersToCheck = Math.max(defaultRamOfServers, currentRamOfServers);
    let highestBuyableRam = 0;
    while (true) {
        if (canBuyAllServersWithRam(ns, ramOfServersToCheck)) {
            highestBuyableRam = ramOfServersToCheck;
            ramOfServersToCheck *= multiplierOfRamOfServers;
            continue;
        }

        break;
    }

    return Math.min(highestBuyableRam, maxRamOfServers);
}
/** @param {import(".").NS } ns
 * @param {number} ramOfServer
 */
function canBuyServerWithRam(ns, ramOfServer) {
    if (ramOfServer > ns.getPurchasedServerMaxRam()) {
        return false;
    }

    return ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ramOfServer);
}

/** @param {import(".").NS } ns */
function canBuyMoreServers(ns) {
    return ns.getPurchasedServers().length < ns.getPurchasedServerLimit();
}

/** @param {import(".").NS } ns
 * @param {number} ramOfServer
 */
function canBuyAllServersWithRam(ns, ramOfServer) {
    if (ramOfServer > ns.getPurchasedServerMaxRam()) {
        return false;
    }
    let costOfAllServersWithRam
        = ns.getPurchasedServerLimit() * ns.getPurchasedServerCost(ramOfServer) * purchaseSafetyMarginMultiplier;
    return ns.getServerMoneyAvailable("home") > costOfAllServersWithRam
}

/** @param {import(".").NS } ns
 * @param {string} serverNamePrefix
 * @param {number} ramOfServer
 */
function buyServerWithRam(ns, serverNamePrefix, ramOfServer) {
    return ns.purchaseServer(serverNamePrefix + "-" + ramOfServer + "GB", ramOfServer);
}

/** @param {import(".").NS } ns
 * @param {string} serverNamePrefix
 * @param {number} ramOfServer
 */
function buyAllServersWithRam(ns, serverNamePrefix, ramOfServer) {
    var serverCounter = 0;
    while (serverCounter < ns.getPurchasedServerLimit()) {
        buyServerWithRam(ns, serverNamePrefix, ramOfServer);
        serverCounter++;
    }
}

/** @param {import(".").NS } ns
 * @param {string} serverName
 */
function destroyMyServer(ns, serverName) {
    if (ns.serverExists(serverName)) {
        ns.killall(serverName);
        ns.deleteServer(serverName);
    }
}

/** @param {import(".").NS } ns */
function destoryAllMyServers(ns) {
    let myServers = ns.getPurchasedServers();
    let serverCounter = 0;

    while (serverCounter < myServers.length) {
        destroyMyServer(ns, myServers[serverCounter]);
        serverCounter++;
    }
}