/** @param {import(".").NS } ns
 * @param {string} factionName
 * @param {string[]} unboughtAugmentsFromFaction
 */
export function getHighestAugmentRepReqForFaction(ns, factionName, unboughtAugmentsFromFaction) {
    let highestRepReq = 0;

    for (let i = 0 ; i < unboughtAugmentsFromFaction.length ; i++) {
        let augment = unboughtAugmentsFromFaction[i];
        let augmentRepReq = ns.getAugmentationRepReq(augment);
        if (augmentRepReq > highestRepReq) {
            highestRepReq = augmentRepReq;
        }
    }

    return highestRepReq;
}