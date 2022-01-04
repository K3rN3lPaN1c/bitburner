/** @param {import(".").NS } ns
 * @param {string[]} rootServers
 */
export function getTargetGroupedServerProcesses(ns, rootServers) {
    let targetGroupedServerProcesses = {};
    for (let i = 0 ; i < rootServers.length ; i++) {
        let rootServer = rootServers[i];
        let serverProcesses = ns.ps(rootServer);
        if (serverProcesses.length) {
            for (let j = 0 ; j < serverProcesses.length ; j++) {
                let serverProcess = serverProcesses[j];
                let fileName = serverProcess.filename;
                let threads = serverProcess.threads;
                let args = serverProcess.args;
                if (args.length === 3) {
                    let targetServer = args[0];
                    // let execStart = new Date(args[1]);
                    let execEnd = new Date(args[2]);
                    if (!(targetServer in targetGroupedServerProcesses)) {
                        targetGroupedServerProcesses[targetServer] = {};
                    }
                    if (!(fileName in targetGroupedServerProcesses[targetServer])) {
                        targetGroupedServerProcesses[targetServer][fileName] = {
                            "threads": 0,
                            "attackers": [],
                            "lastAttackFinishesAt": new Date(),
                        }
                    }


                    targetGroupedServerProcesses[targetServer][fileName].threads += threads;
                    if (!targetGroupedServerProcesses[targetServer][fileName].attackers.includes(rootServer)) {
                        targetGroupedServerProcesses[targetServer][fileName].attackers.push(rootServer);
                    }
                    if (execEnd.getTime() > targetGroupedServerProcesses[targetServer][fileName].lastAttackFinishesAt.getTime()) {
                        targetGroupedServerProcesses[targetServer][fileName].lastAttackFinishesAt = execEnd;
                    }
                }
            }
        }
    }

    return targetGroupedServerProcesses;
}