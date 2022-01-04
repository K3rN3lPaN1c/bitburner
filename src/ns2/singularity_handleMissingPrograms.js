import * as CONSTANTS from "lib_constants.js";

/** @param {import(".").NS } ns */
export async function main(ns) {
    let programNames = Object.keys(CONSTANTS.SINGULARITY_PROGRAMS_REQUIREMENTS);
    let hackLevel = ns.getPlayer().hacking;

    for (let j = 0 ; j < programNames.length ; j++) {
        let programName = programNames[j];
        let programMinHackLevel = CONSTANTS.SINGULARITY_PROGRAMS_REQUIREMENTS[programName];
        if (!ns.fileExists(programName, CONSTANTS.SERVER_HOME)) {
            if (!CONSTANTS.SINGULARITY_BUY_PROGRAMS && hackLevel >= programMinHackLevel) {
                if (CONSTANTS.SINGULARITY_WORK_TYPES_NOT_TO_INTERRUPT.includes(ns.getPlayer().workType)) {
                    return;
                }
                ns.createProgram(programName);
                return;
            } else if (CONSTANTS.SINGULARITY_BUY_PROGRAMS && ns.getPlayer().tor) {
                if (ns.purchaseProgram(programName)) {
                    ns.toast("Bought program: " + programName)
                }
            }
        }
    }
}