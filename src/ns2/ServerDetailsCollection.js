import ServerDetails from "ServerDetails.js";

export default class ServerDetailsCollection {
    /** @param {import(".").NS } ns */
    #ns;
    
    serverObjects = [];

    constructor(ns) {
        this.#ns = ns;
    }

    serverAlreadyAdded(serverName) {
        if (undefined === serverName) {
            return true;
        }
        for (let i = 0; i < this.serverObjects.length; i++) {
            if (this.serverObjects[i].name === serverName || serverName === "home") {
                return true;
            }
        }
        return false;
    }

    add(serverName) {
        if (!this.serverAlreadyAdded(serverName)) {
            this.serverObjects.push(new ServerDetails(this.#ns, serverName));
        }
    }

    getByName(serverName) {
        for (let i = 0; i < this.serverObjects.length; i++) {
            if (this.serverObjects[i].name === serverName) {
                return this.serverObjects[i];
            }
        }
        return false;
    }

    sortByDesc(propertyName) {
        this.serverObjects.sort(function(a,b) {
            return b[propertyName] - a[propertyName];
        });
    }

    debug() {
        let debugStuff = [];
        for (let i = 0; i < this.serverObjects.length; i++) {
            debugStuff.push({
                "name": this.serverObjects[i].name,
                "value": this.serverObjects[i].moneyPerGrowThreadsPerSeconds,
                "maxMoney": this.serverObjects[i].maxMoney,
            });
        }
        return debugStuff;
    }

    getAvailableRam() {
        let availableRam = 0;
        for (let i = 0; i < this.serverObjects.length; i++) {
            availableRam += this.serverObjects[i].availableRam;
        }
        return availableRam;
    }

    getServersForHacking(serversForHacking) {
        for (let i = 0; i < this.serverObjects.length; i++) {
            
            let serverObject = this.serverObjects[i];

            if (
                serverObject.moneyAvailableRatio > 0.95
                && serverObject.securityLevelDifference < 5
            ) {
                serversForHacking.add(serverObject.name);
            }
        }

        serversForHacking.sortByDesc("hackThreadsToGetHalfMoney");

        return serversForHacking;
    }

    getServersForGrowing(serversForGrowing) {
        for (let i = 0; i < this.serverObjects.length; i++) {
            
            let serverObject = this.serverObjects[i];

            if (
                serverObject.moneyAvailableRatio <= 0.95
                && serverObject.securityLevelDifference < 5
            ) {
                serversForGrowing.add(serverObject.name);
            }
        }

        serversForGrowing.sortByDesc("moneyPerGrowThreadsPerSeconds");

        return serversForGrowing;
    }
    
    getServersForWeakening(serversForWeakening) {
        for (let i = 0; i < this.serverObjects.length; i++) {
            
            let serverObject = this.serverObjects[i];

            if (
                serverObject.moneyAvailableRatio <= 0.95
                && serverObject.securityLevelDifference >= 5
            ) {
                serversForWeakening.add(serverObject.name);
            }
        }
        this.#ns.tprint(serversForWeakening);

        serversForWeakening.sortByDesc("moneyPerGrowThreadsPerSeconds");

        return serversForWeakening;
    }

}