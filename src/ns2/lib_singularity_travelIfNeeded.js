/** @param {import(".").NS } ns
 * @param {string} city
 */
export function travelIfNeeded(ns, city) {
    if (ns.getPlayer().city !== city && ns.getPlayer().money >= 200000) {
        ns.toast("Welcome to " + city + "!!!");
        return ns.travelToCity(city);
    }
    return false;
}