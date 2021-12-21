export default class ServerDetails {
    /** @param {import(".").NS } #ns */
    #ns;
    name = 0;

    /** @param {import(".").NS } ns */
    constructor(ns, name) {
        this.#ns = ns;
        this.name = name;
    }

    get growTime() {
        return this.#ns.getGrowTime(this.name);
    }
    get hackTime() {
        return this.#ns.getHackTime(this.name);
    }
    get weakenTime() {
        return this.#ns.getWeakenTime(this.name);
    }

    get serverGrowth() {
        return this.#ns.getServerGrowth(this.name);
    }

    get moneyAvailable() {
        return this.#ns.getServerMoneyAvailable(this.name);
    }
    get maxMoney() {
        return this.#ns.getServerMaxMoney(this.name);
    }
    get moneyAvailableRatio() {
        return this.moneyAvailable/this.maxMoney;
    }

    get usedRam() {
        return this.#ns.getServerUsedRam(this.name);
    }
    get maxRam() {
        return this.#ns.getServerMaxRam(this.name);
    }
    get availableRam() {
        return this.maxRam-this.usedRam;
    }

    get minSecurityLevel() {
        return this.#ns.getServerMinSecurityLevel(this.name);
    }
    get securityLevel() {
        return this.#ns.getServerSecurityLevel(this.name);
    }
    get securityLevelDifference() {
        return this.securityLevel - this.minSecurityLevel;
    }

    get requiredHackingLevel() {
        return this.#ns.getServerRequiredHackingLevel(this.name);
    }
    get hasRootAccess() {
        return this.#ns.hasRootAccess();
    }
    
    get hackThreadsToGetHalfMoney() {
        return this.#ns.hackAnalyzeThreads(this.name, this.moneyAvailable/2);
    }
    get hackThreadsToGetAllMoney() {
        return this.#ns.hackAnalyzeThreads(this.name, this.moneyAvailable);
    }

    get multiplierToReachMaxMoney() {
        return this.maxMoney / Math.max(1,this.moneyAvailable);
    }
    
    get multiplierToReachMaxMoneyFromBase() {
        return this.maxMoney / 1;
    };

    get growThreadsToReachMaxMoney() {
        return this.#ns.growthAnalyze(this.name, this.multiplierToReachMaxMoney) ?? 0;
    };

    get growThreadsToReachMaxMoneyFromBase() {
        return this.#ns.growthAnalyze(this.name, this.multiplierToReachMaxMoneyFromBase) ?? 0;
    }

    get moneyPerGrowThreads() {
        if (this.growThreadsToReachMaxMoney <= 0) {
            return 0;
        }
        return this.maxMoney / this.growThreadsToReachMaxMoney;
    }

    get moneyPerGrowThreadsPerSeconds() {
        if (this.moneyPerGrowThreads <= 0) {
            return 0;
        }
        return (this.moneyPerGrowThreads / (this.growTime/1000)) ?? 0;
    }

    get moneyPerGrowThreadsFromBase() {
        if (this.growThreadsToReachMaxMoneyFromBase <= 0) {
            return 0;
        }
        return this.maxMoney / this.growThreadsToReachMaxMoneyFromBase;
    }

    get moneyPerGrowThreadsPerSecondsFromBase() {
        if (this.moneyPerGrowThreadsFromBase <= 0) {
            return 0;
        }
        return (this.moneyPerGrowThreadsFromBase / (this.growTime/1000)) ?? 0;
    }


    testing() {
        let securityIncreaseToReachMaxMoney = this.#ns.growthAnalyzeSecurity(this.growThreadsToReachMaxMoney);
        let percentOfMoneyStolenWithASingleThread = this.#ns.hackAnalyze(this.name);
        let chanceOfSuccessfulHack = this.#ns.hackAnalyzeChance(this.name);
        let securityIncreaseWithASingleThreadHack = this.#ns.hackAnalyzeSecurity(1);
        let securityIncreaseWithADualThreadHack = this.#ns.hackAnalyzeSecurity(2);
        let hackEffectWithASingleThreadHack = this.#ns.hackAnalyzeThreads(this.name, 1);
        let hackEffectWithADualThreadHack = this.#ns.hackAnalyzeThreads(this.name, 2);
        
        this.l("==================================");
        this.l(this.name);
        this.l("++++++++++++++++++++++++++++++++++");
        this.l("growTime: " + this.#ns.tFormat(this.growTime));
        this.l("hackTime: " + this.#ns.tFormat(this.hackTime));
        this.l("weakenTime: " + this.#ns.tFormat(this.weakenTime));
        this.l("serverGrowth: " + this.serverGrowth);
        this.l("maxMoney: " + this.maxMoney);
        this.l("maxRam: " + this.maxRam);
        this.l("minSecurityLevel: " + this.minSecurityLevel);
        this.l("moneyAvailable: " + this.moneyAvailable);
        this.l("requiredHackingLevel: " + this.requiredHackingLevel);
        this.l("securityLevel: " + this.securityLevel);
        this.l("usedRam: " + this.usedRam);
        this.l("----------------------------------");
        this.l("multiplierToReachMaxMoney: " + this.multiplierToReachMaxMoney);
        this.l("moneyPerGrowThreads: " + this.moneyPerGrowThreads);
        this.l("moneyPerGrowThreadsPerSeconds: " + this.moneyPerGrowThreadsPerSeconds);
        this.l("moneyPerGrowThreadsFromBase: " + this.moneyPerGrowThreadsFromBase);
        this.l("moneyPerGrowThreadsPerSecondsFromBase: " + this.moneyPerGrowThreadsPerSecondsFromBase);
        this.l("----------------------------------");
        this.l("securityIncreaseWithASingleThreadHack: " + securityIncreaseWithASingleThreadHack);
        this.l("securityIncreaseWithADualThreadHack: " + securityIncreaseWithADualThreadHack);
        this.l("hackEffectWithASingleThreadHack: " + hackEffectWithASingleThreadHack);
        this.l("hackEffectWithADualThreadHack: " + hackEffectWithADualThreadHack);
        this.l("chanceOfSuccessfulHack: " + chanceOfSuccessfulHack);
        this.l("percentOfMoneyStolenWithASingleThread: " + percentOfMoneyStolenWithASingleThread);
        this.l("growThreadsToReachMaxMoney: " + this.growThreadsToReachMaxMoney);
        this.l("securityIncreaseToReachMaxMoney: " + securityIncreaseToReachMaxMoney);
        this.l("==================================");
    }

    getTestObject() {
        return {
            "name": this.name,
            "moneyPerGrowThreadsPerSeconds": this.moneyPerGrowThreadsPerSeconds,
            "moneyPerGrowThreadsPerSecondsFromBase": this.moneyPerGrowThreadsPerSecondsFromBase
        };
    }

    l (msg) {
        this.#ns.tprint(msg);
    }
}