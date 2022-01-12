/** @param {import("./index").NS } ns */
export async function main(ns) {
    let jsScripts = ns.ls("home", ".js");

    for (let i = 0 ; i < jsScripts.length ; i++) {
        ns.rm(jsScripts[i]);
    }
}