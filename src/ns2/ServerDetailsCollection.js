import ServerDetails from "ServerDetails.js";

export default class ServerDetailsCollection {
    /** @param {import(".").NS } ns */
    ns;
    internalCounter = 0;
    
    serverObjects = [];

    constructor(ns) {
        this.ns = ns;
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    get length() {
        return this.serverObjects.length;
    }

    hasNext() {
        return this.internalCounter < this.serverObjects.length;
    }

    /**
     *
     * @returns {ServerDetails}
     */
    getNext() {
        let next = this.serverObjects[this.internalCounter];
        this.internalCounter++;
        return next;
    }

    reset() {
        this.internalCounter = 0;
    }

    serverAlreadyAdded(serverName) {
        if (undefined === serverName) {
            return true;
        }

        if (serverName === "home") {
            return true;
        }

        for (let i = 0; i < this.serverObjects.length; i++) {
            if (this.serverObjects[i].name === serverName) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {ServerDetails} serverDetails
     */
    add(serverDetails) {
        this.serverObjects.push(serverDetails);
    }

    addByName(serverName) {
        if (!this.serverAlreadyAdded(serverName)) {
            this.serverObjects.push(new ServerDetails(this.ns, serverName));
        }
    }

    removeByName(serverName) {
        for (let i = 0; i < this.serverObjects.length; i++) {
            if (this.serverObjects[i].name === serverName) {
                this.serverObjects.splice(i, 1);
            }
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

    sortByAsc(propertyName) {
        this.serverObjects.sort(function(a,b) {
            return a[propertyName] - b[propertyName];
        });
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
                "moneyPerGrowThreadsPerSeconds": this.serverObjects[i].moneyPerGrowThreadsPerSeconds,
                "maxMoney": this.serverObjects[i].maxMoney,
                "securityLevel": this.serverObjects[i].securityLevel,
            });
        }
        return JSON.stringify(debugStuff,null,2); 
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
                serversForHacking.addByName(serverObject.name);
            }
        }

        serversForHacking.sortByDesc("hackThreadsToGetHalfMoney");
    }

    getServersForGrowing(serversForGrowing) {
        for (let i = 0; i < this.serverObjects.length; i++) {
            let serverObject = this.serverObjects[i];

            if (
                serverObject.moneyAvailableRatio <= 0.95
                && serverObject.securityLevelDifference < 5
            ) {
                serversForGrowing.addByName(serverObject.name);
            }
        }

        serversForGrowing.sortByDesc("moneyPerGrowThreadsPerSeconds");
    }
    
    getServersForWeakening(serversForWeakening) {
        for (let i = 0; i < this.serverObjects.length; i++) {
            let serverObject = this.serverObjects[i];

            if (serverObject.securityLevelDifference >= 5) {
                serversForWeakening.addByName(serverObject.name);
            }
        }

        serversForWeakening.sortByDesc("moneyPerGrowThreadsPerSeconds");
    }

    getNextServerWithEnoughRam(totalRamCost, scriptRam) {
        this.sortByAsc("availableRam");

        if (this.serverObjects.length === 0) {
            return false;
        }

        for (let i = 0 ; i < this.serverObjects.length; i++) {
            let currentServer = this.serverObjects[i];

            if (currentServer.availableRam < scriptRam) {
                continue;
            }

            if (i === this.serverObjects.length - 1 || currentServer > totalRamCost) {
                //this.removeByName(currentServer.name);
                return currentServer;
            }
        }
    }

    limit(limit) {
        while (this.serverObjects.length > limit) {
            this.serverObjects.pop();
        }
    }

}