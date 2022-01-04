const HACKNET_NODE_MONEY_SAFETY_MARGIN = 1;
const HACKNET_MAXIMUM_NUMBER_OF_NODES = 16;
const HACKNET_ONLY_BUY_NEW_IF_PREVIOUS_IS_FULLY_UPGRADED = false;
const HACKNET_PRODUCTION_LIMIT = 500000;

/** @param {import(".").NS } ns */
export async function main(ns) {

    ns.toast("Starting hacknet node management", "info");

    let totalProduction = 0;
    for (let i = 0; i < ns.hacknet.numNodes() ; i++) {
        totalProduction += ns.hacknet.getNodeStats(i).production;
    }
    if (totalProduction > HACKNET_PRODUCTION_LIMIT) {
        ns.exit();
    }

    if (
        !HACKNET_ONLY_BUY_NEW_IF_PREVIOUS_IS_FULLY_UPGRADED
        && ns.hacknet.numNodes() < HACKNET_MAXIMUM_NUMBER_OF_NODES
        && ns.getServerMoneyAvailable("home") > HACKNET_NODE_MONEY_SAFETY_MARGIN * ns.hacknet.getPurchaseNodeCost()
    ) {
        ns.hacknet.purchaseNode();
    }

    let fullyUpgradedNodes = 0;
    let numNodes = ns.hacknet.numNodes();
        for (let i = 0; i < numNodes; i++) {
        while (ns.getServerMoneyAvailable("home") > HACKNET_NODE_MONEY_SAFETY_MARGIN * ns.hacknet.getLevelUpgradeCost(i, 1)) {
            ns.hacknet.upgradeLevel(i, 1);
        }
        while (ns.getServerMoneyAvailable("home") > HACKNET_NODE_MONEY_SAFETY_MARGIN * ns.hacknet.getRamUpgradeCost(i, 1)) {
            ns.hacknet.upgradeRam(i, 1);
        }
        while (ns.getServerMoneyAvailable("home") > HACKNET_NODE_MONEY_SAFETY_MARGIN * ns.hacknet.getCoreUpgradeCost(i, 1)) {
            ns.hacknet.upgradeCore(i, 1);
        }

        if (
            !isFinite(ns.hacknet.getLevelUpgradeCost(i, 1))
            && !isFinite(ns.hacknet.getRamUpgradeCost(i, 1))
            && !isFinite(ns.hacknet.getCoreUpgradeCost(i, 1))
        ) {
            fullyUpgradedNodes++;
        }
    }



    if (
        HACKNET_ONLY_BUY_NEW_IF_PREVIOUS_IS_FULLY_UPGRADED
        && fullyUpgradedNodes === numNodes
        && ns.hacknet.numNodes() < HACKNET_MAXIMUM_NUMBER_OF_NODES
        && ns.getServerMoneyAvailable("home") > HACKNET_NODE_MONEY_SAFETY_MARGIN * ns.hacknet.getPurchaseNodeCost()
        ) {
        ns.hacknet.purchaseNode();
    }
}