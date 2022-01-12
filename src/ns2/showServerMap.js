import {getNestedServersList} from "./lib_nestedServerList";

/** @param {import("./index").NS } ns */
export async function main(ns) {
    ns.tprint(JSON.stringify(getNestedServersList(ns), null, 2));
}