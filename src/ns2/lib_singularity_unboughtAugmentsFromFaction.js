/** @param {import(".").NS } ns
 * @param {string} factionName
 */
export function getUnboughtAugmentsFromFaction(ns, factionName) {
    return ns.getAugmentationsFromFaction(factionName).filter(x => !ns.getOwnedAugmentations(true).includes(x));
}