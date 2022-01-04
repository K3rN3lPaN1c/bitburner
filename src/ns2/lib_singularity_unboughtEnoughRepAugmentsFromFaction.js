/** @param {import(".").NS } ns
 * @param {string} factionName
 * @param {string[]} unboughtAugments
 */
export function getUnboughtEnoughRepAugmentsFromFaction(ns, factionName, unboughtAugments) {
    let factionRep = ns.getFactionRep(factionName)

    for (let i = 0 ; i < unboughtAugments.length ; i++) {
        let augment = unboughtAugments[i];
        if (ns.getAugmentationRepReq(augment) > factionRep) {
            unboughtAugments.splice(i, 1);
            i--;
        }
    }

    return unboughtAugments;
}