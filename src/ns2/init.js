const SCRIPT_DISPATCHER = "dispatcher.js";
const SCRIPT_CONSTANTS = "lib_constants.js";
const SCRIPT_SYNC_RUN = "lib_syncRun.js";


const FILES_TO_DOWNLOAD = [
    SCRIPT_DISPATCHER,
    SCRIPT_CONSTANTS,
    SCRIPT_SYNC_RUN,
];

/** @param {import(".").NS } ns */
export async function main(ns) {
    //let baseUrl = "https://raw.githubusercontent.com/K3rN3lPaN1c/bitburner/feature/kuvee-ns-scripts/src/ns2/";
    let baseUrl = "file:///C:/Bitburner/bitburner/src/ns2/";

    killAllScriptsExceptThis(ns);
    await downloadAllFiles(ns, baseUrl, FILES_TO_DOWNLOAD);

    ns.exec(SCRIPT_DISPATCHER, ns.getHostname());
}

/** @param {import(".").NS } ns */
function killAllScriptsExceptThis(ns) {
    let runningScripts = ns.ps();
    for (let i = 0 ; i < runningScripts.length ; i++) {
        let scriptName = runningScripts[i].filename;
        if (scriptName !== ns.getScriptName()) {
            ns.kill(scriptName, ns.getHostname());
        }
    }
}

/** @param {import(".").NS } ns
 * @param {string} baseUrl
 * @param {string[]} files
 */
async function downloadAllFiles(ns, baseUrl, files) {
    for (let i = 0 ; i < files.length ; i++) {
        let fileName = files[i];
        ns.rm(fileName);
        await ns.wget(baseUrl + fileName, fileName);
    }
}