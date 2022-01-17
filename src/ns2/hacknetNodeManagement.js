import * as CONSTANTS from "lib_constants.js";
import {FLAG_HACKNET_SPEND_HASHES_FOR_TRAINING} from "lib_constants.js";

const HACKNET_NODE_MONEY_SAFETY_MARGIN = 1;
const HACKNET_MAXIMUM_NUMBER_OF_NODES = 16;

const HACKNET_UPGRADE_SELL_FOR_MONEY = "Sell for Money";
const HACKNET_UPGRADE_SELL_FOR_CORPORATION_FUNDS = "Sell for Corporation Funds";
const HACKNET_EXCHANGE_FOR_BLADEBURNER_RANK = "Exchange for Bladeburner Rank";
const HACKNET_EXCHANGE_FOR_BLADEBURNER_SP = "Exchange for Bladeburner SP";
const HACKNET_EXCHANGE_FOR_REDUCE_MINIMUM_SECURITY = "Reduce Minimum Security";
const HACKNET_EXCHANGE_FOR_INCREASE_MAXIMUM_MONEY = "Increase Maximum Money";
const HACKNET_IMPROVE_GYM_TRAINING = "Improve Gym Training";
const HACKNET_IMPROVE_STUDYING = "Improve Studying";

/** @param {import(".").NS } ns */
export async function main(ns) {
    ns.toast("Starting hacknet node management", "info");

    spendHashes(ns);

    if (CONSTANTS.FLAG_HACKNET_PURCHASE_AND_UPGRADE_NODES) {
        buyNewNodes(ns);
        upgradeExistingNodes(ns);
    }
}

/** @param {import(".").NS } ns */
function spendHashes(ns) {
    let spendForMoney = true;

    if (CONSTANTS.FLAG_HACKNET_SPEND_HASHES_FOR_BLADEBURNER) {
        spendAndWaitFor(ns, HACKNET_EXCHANGE_FOR_BLADEBURNER_RANK) && (spendForMoney = false);
        spendAndWaitFor(ns, HACKNET_EXCHANGE_FOR_BLADEBURNER_SP) && (spendForMoney = false);
    }

    if (CONSTANTS.FLAG_HACKNET_SPEND_HASHES_FOR_SERVER) {
        spendAndWaitFor(ns, HACKNET_EXCHANGE_FOR_REDUCE_MINIMUM_SECURITY, "sigma-cosmetics") && (spendForMoney = false);
        spendAndWaitFor(ns, HACKNET_EXCHANGE_FOR_INCREASE_MAXIMUM_MONEY, "sigma-cosmetics") && (spendForMoney = false);
    }

    if (CONSTANTS.FLAG_HACKNET_SPEND_HASHES_FOR_TRAINING) {
        spendAndWaitFor(ns, HACKNET_IMPROVE_GYM_TRAINING) && (spendForMoney = false);
        spendAndWaitFor(ns, HACKNET_IMPROVE_STUDYING) && (spendForMoney = false);
    }

    if (spendForMoney) {
        spendAndWaitFor(ns, HACKNET_UPGRADE_SELL_FOR_MONEY);
    }
}

/** @param {import(".").NS } ns
 * @param {string} hashUpgrade
 * @param {string} target
 */
function spendAndWaitFor(ns, hashUpgrade, target) {
    let waitFor = false;
    while (ns.hacknet.numHashes() >= ns.hacknet.hashCost(hashUpgrade)) {
        if (target === undefined) {
            ns.hacknet.spendHashes(hashUpgrade);
        } else {
            ns.hacknet.spendHashes(hashUpgrade, target);
        }
    }
    if (ns.hacknet.hashCapacity() >= ns.hacknet.hashCost(hashUpgrade)) {
        waitFor = true;
    }
    return waitFor;
}

/** @param {import(".").NS } ns */
function buyNewNodes(ns) {
    while (
        ns.hacknet.numNodes() < HACKNET_MAXIMUM_NUMBER_OF_NODES
        && ns.getPlayer().money > HACKNET_NODE_MONEY_SAFETY_MARGIN * ns.hacknet.getPurchaseNodeCost()
        ) {
        ns.hacknet.purchaseNode();
    }
}

function upgradeExistingNodes(ns) {
    let numNodes = ns.hacknet.numNodes();

    for (let i = 0; i < numNodes; i++) {
        while (ns.getPlayer().money > HACKNET_NODE_MONEY_SAFETY_MARGIN * ns.hacknet.getLevelUpgradeCost(i, 1)) {
            ns.hacknet.upgradeLevel(i, 1);
        }
        while (ns.getPlayer().money > HACKNET_NODE_MONEY_SAFETY_MARGIN * ns.hacknet.getRamUpgradeCost(i, 1)) {
            ns.hacknet.upgradeRam(i, 1);
        }
        while (ns.getPlayer().money > HACKNET_NODE_MONEY_SAFETY_MARGIN * ns.hacknet.getCoreUpgradeCost(i, 1)) {
            ns.hacknet.upgradeCore(i, 1);
        }
        while (ns.getPlayer().money > HACKNET_NODE_MONEY_SAFETY_MARGIN * ns.hacknet.getCacheUpgradeCost(i, 1)) {
            ns.hacknet.upgradeCache(i, 1);
        }
    }
}