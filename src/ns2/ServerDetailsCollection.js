import ServerDetails from "ServerDetails.js";

export default class ServerDetailsCollection {
    /** @param {import(".").NS } ns */
    #ns;
    
    serverObjects = [];

    constructor(ns) {
        this.#ns = ns;
    }

    serverAlreadyAdded(serverName) {
        for (let i = 0; i < this.serverObjects.length; i++) {
            if (this.serverObjects[i].name === serverName) {
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
        var debugStuff = [];
        for (let i = 0; i < this.serverObjects.length; i++) {
            debugStuff.push({
                "name": this.serverObjects[i].name,
                "value": this.serverObjects[i].moneyPerGrowThreadsPerSeconds,
            });
        }
        return debugStuff;
    }

    

}