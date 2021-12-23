/** @param {import(".").NS } ns */
export async function main(ns) {
    await ns.wget("https://raw.githubusercontent.com/K3rN3lPaN1c/bitburner/feature/kuvee-ns-scripts/src/ns2/init.js", "init.js");
    ns.killall("home");
    ns.run("init.js");
    ns.tail("init.js");
}