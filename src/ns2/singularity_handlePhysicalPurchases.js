/** @param {import(".").NS } ns */
export async function main(ns) {
    if (!ns.getPlayer().tor && ns.purchaseTor()) {
        ns.toast("TOR Router has been purchased!")
    }

    if (ns.upgradeHomeRam()) {
        ns.toast("Home RAM has been upgraded!")
    }

    if (ns.upgradeHomeCores()) {
        ns.toast("Home Cores have been upgraded!")
    }
}