/** @param {import(".").NS } ns */
export async function main(ns) {
    if (!ns.getPlayer().tor && ns.purchaseTor()) {
        ns.toast("TOR Router has been purchased!")
    }

    while (ns.upgradeHomeRam()) {
        ns.toast("Home RAM has been upgraded!")
    }

    while (ns.upgradeHomeCores()) {
        ns.toast("Home Cores have been upgraded!")
    }
}