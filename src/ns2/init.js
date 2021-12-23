/** @param {import(".").NS } ns */
export async function main(ns) {
    let initScript = "dispatcher.js";
    let commonLib = "commonLib.js";

    //let baseUrl = "https://raw.githubusercontent.com/K3rN3lPaN1c/bitburner/feature/kuvee-ns-scripts/src/ns2/";
    let baseUrl = "file:///C:/Bitburner/bitburner/src/ns2/";

    if (ns.fileExists(initScript)) {
        ns.rm(initScript);
    }
    await ns.wget(baseUrl + initScript, initScript);
    await ns.wget(baseUrl + commonLib, commonLib);

    killAllScriptsExceptThis(ns);
    ns.exec(initScript, ns.getHostname());
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