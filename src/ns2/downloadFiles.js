/** @param {import(".").NS } ns */
export async function main(ns) {
    //let baseUrl = "https://raw.githubusercontent.com/K3rN3lPaN1c/bitburner/feature/kuvee-ns-scripts/src/ns2/";
    let baseUrl = "file:///C:/Bitburner/bitburner/src/ns2/";

    await ns.wget(baseUrl + "init.js", "init.js");

    killAllScriptsExceptThis(ns);
    ns.exec("init.js", "home");
    ns.tail("init.js");
}

/** @param {import(".").NS } ns */
function killAllScriptsExceptThis(ns) {
    let runningScripts = ns.ps();
    for (let i = 0 ; i < runningScripts.length ; i++) {
        let scriptName = runningScripts[i].filename;
        if (scriptName !== ns.getScriptName()) {
            ns.kill(scriptName);
        }
    }
}