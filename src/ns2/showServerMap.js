import * as commonLib from "commonLib.js";

/** @param {import(".").NS } ns */
export async function main(ns) {
    commonLib.sexyPrintObject(ns, commonLib.getNestedServersList(ns));
}