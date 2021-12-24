const GANG_TASK_UNASSIGNED = "Unassigned";
const GANG_TASK_MUG_PEOPLE = "Mug People";
const GANG_TASK_DEAl_DRUGS = "Deal Drugs";
const GANG_TASK_STRONGARM_CIVILIANS = "Strongarm Civilians";
const GANG_TASK_RUN_A_CON = "Run a Con";
const GANG_TASK_ARMED_ROBBERY = "Armed Robbery";
const GANG_TASK_TRAFFICK_ILLEGAL_ARMS = "Traffick Illegal Arms";
const GANG_TASK_THREATEN_AND_BLACKMAIL = "Threaten & Blackmail";
const GANG_TASK_HUMAN_TRAFFICKING = "Human Trafficking";
const GANG_TASK_TERRORISM = "Terrorism";
const GANG_TASK_VIGILANTE_JUSTICE = "Vigilante Justice";
const GANG_TASK_TRAIN_COMBAT = "Train Combat";
const GANG_TASK_TRAIN_CHARISMA = "Train Charisma";
const GANG_TASK_TRAIN_HACKING = "Train Hacking";
const GANG_TASK_TERRITORY_WARFARE = "Territory Warfare";

const GANG_TRAINING_TASKS = [
    GANG_TASK_TRAIN_CHARISMA,
    GANG_TASK_TRAIN_COMBAT,
    GANG_TASK_TRAIN_HACKING,
];

const GANG_BASIC_TRAINING_THRESHOLD = 50;

const GANG_MEMBER_NAME_TEMPLATE = "PulykaMan %d";

/** @param {import(".").NS } ns */
export async function main(ns) {
    if (!ns.gang.inGang()) {
        ns.toast("Not in a gang!", "error")
        ns.exit();
    }
    ns.toast("Starting gang management", "info");


    recruitMembers(ns);
    let gangMemberCollection = gatherMembers(ns);

    //AUGMENTS
    handleBuyingEquipments(ns, gangMemberCollection);
    handleTrainingLowLevelMembers(ns, gangMemberCollection);
    handleStandardDuyForMembers(ns, gangMemberCollection);
    await handleWantedLevel(ns, gangMemberCollection);

}

/** @param {import(".").NS } ns */
function recruitMembers(ns) {
    let memberNames = ns.gang.getMemberNames();
    let numOfRecruit = memberNames.length;

    while (ns.gang.canRecruitMember()) {
        numOfRecruit++;
        let recruitName = ns.sprintf(GANG_MEMBER_NAME_TEMPLATE, numOfRecruit)
        if (ns.gang.recruitMember(recruitName)) {
            ns.toast(ns.sprintf("%s has been recruited for our cause!", recruitName));
        }
    }
}

/** @param {import(".").NS } ns */
function gatherMembers(ns) {
    let gangMemberCollection = new GangMemberCollection(ns);

    let memberNames = ns.gang.getMemberNames();
    for (let i = 0 ; i < memberNames.length ; i++) {
        gangMemberCollection.addByName(memberNames[i]);
    }

    return gangMemberCollection;
}

/** @param {import(".").NS } ns
 * @param {GangMemberCollection} gangMemberCollection
 */
function handleBuyingEquipments(ns, gangMemberCollection){
    let equipments = ns.gang.getEquipmentNames();

    for (let i = 0 ; i < equipments.length ; i++) {
        let equipmentName = equipments[i];
        gangMemberCollection.reset();
        while (gangMemberCollection.hasNext()) {
            let gangMember = gangMemberCollection.getNext();
            if (
                !ns.gang.getMemberInformation(gangMember.name).upgrades.includes(equipmentName)
                && !ns.gang.getMemberInformation(gangMember.name).augmentations.includes(equipmentName)
                && ns.gang.getEquipmentCost(equipmentName) <= ns.getServerMoneyAvailable("home")
            ) {
                ns.gang.purchaseEquipment(gangMember.name, equipmentName)
            }
        }
    }
}

/** @param {import(".").NS } ns
 * @param {GangMemberCollection} gangMemberCollection
 */
function handleTrainingLowLevelMembers(ns, gangMemberCollection) {
    gangMemberCollection.reset();
    while (gangMemberCollection.hasNext()) {
        let gangMember = gangMemberCollection.getNext();
        if (
            gangMember.str < GANG_BASIC_TRAINING_THRESHOLD
            || gangMember.def < GANG_BASIC_TRAINING_THRESHOLD
            || gangMember.dex < GANG_BASIC_TRAINING_THRESHOLD
            || gangMember.agi < GANG_BASIC_TRAINING_THRESHOLD
        ) {
            gangMember.setTaskIfNotAlreadyReviewed(GANG_TASK_TRAIN_COMBAT);
        }
    }
}

/** @param {import(".").NS } ns
 * @param {GangMemberCollection} gangMemberCollection
 */
function handleStandardDuyForMembers(ns, gangMemberCollection) {
    gangMemberCollection.reset();
    while (gangMemberCollection.hasNext()) {
        let gangMember = gangMemberCollection.getNext();
        // gangMember.setTaskIfNotAlreadyReviewed(GANG_TASK_MUG_PEOPLE);
        gangMember.setTaskIfNotAlreadyReviewed(GANG_TASK_STRONGARM_CIVILIANS);
    }
}


/** @param {import(".").NS } ns
 * @param {GangMemberCollection} gangMemberCollection
 */
async function handleWantedLevel(ns, gangMemberCollection) {
    gangMemberCollection.reset();

    while (ns.gang.getGangInformation().wantedLevel > 2 && gangMemberCollection.hasNext()) {
        await ns.asleep(1);
        let gangMember = gangMemberCollection.getNext();

        if (gangMember.isTraining()) {
            continue;
        }

        gangMember.setTask(GANG_TASK_VIGILANTE_JUSTICE);
    }
}

class GangMemberCollection {
    /** @param {import(".").NS } ns */
    ns;
    internalCounter = 0;

    objects = [];

    constructor(ns) {
        this.ns = ns;
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    get length() {
        return this.objects.length;
    }

    hasNext() {
        return this.internalCounter < this.objects.length;
    }

    /**
     * @returns {GangMember}
     */
    getNext() {
        let next = this.objects[this.internalCounter];
        this.internalCounter++;
        return next;
    }

    reset() {
        this.internalCounter = 0;
    }

    objectAlreadyAdded(objectName) {
        if (undefined === objectName) {
            return true;
        }

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].name === objectName) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {GangMember} object
     */
    add(object) {
        this.objects.push(object);
    }

    addByName(objectName) {
        if (!this.objectAlreadyAdded(objectName)) {
            this.objects.push(new GangMember(this.ns, objectName));
        }
    }

    removeByName(objectName) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].name === objectName) {
                this.objects.splice(i, 1);
            }
        }
    }

    getByName(objectName) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].name === objectName) {
                return this.objects[i];
            }
        }
        return false;
    }

    sortByAsc(propertyName) {
        this.objects.sort(function(a, b) {
            return a[propertyName] - b[propertyName];
        });
    }

    sortByDesc(propertyName) {
        this.objects.sort(function(a, b) {
            return b[propertyName] - a[propertyName];
        });
    }

    getUnreviewedMembers() {
        let unreviewedMembers = new GangMemberCollection();
        for (let i = 0; i < this.objects.length; i++) {
            let object = this.objects[i];

            if (!object.task_reviewed) {
                unreviewedMembers.addByName(object.name);
            }
        }

        return unreviewedMembers;
    }


}


class GangMember {
    /** @param {import(".").NS } #ns */
    #ns;
    name;
    task_reviewed = false;

    /**
     * @param {import(".").NS } ns
     * @param {string} name
     * */
    constructor(ns, name) {
        this.#ns = ns;
        this.name = name;
    }

    get current_task() {
        return this.#ns.gang.getMemberInformation(this.name).task;
    }

    get str() {
        return this.#ns.gang.getMemberInformation(this.name).str;
    }

    get def() {
        return this.#ns.gang.getMemberInformation(this.name).def;
    }

    get dex() {
        return this.#ns.gang.getMemberInformation(this.name).dex;
    }

    get agi() {
        return this.#ns.gang.getMemberInformation(this.name).agi;
    }

    isTraining() {
        return GANG_TRAINING_TASKS.includes(this.current_task);
    }

    isVigilante() {
        return this.current_task === GANG_TASK_VIGILANTE_JUSTICE;
    }

    setTask(taskName) {
        this.#ns.gang.setMemberTask(this.name, taskName);
        this.task_reviewed = true;
    }

    setTaskIfNotAlreadyReviewed(taskName) {
        if (!this.task_reviewed) {
            this.#ns.gang.setMemberTask(this.name, taskName);
            this.task_reviewed = true;
        }
    }
}

/*
2021-12-24 11:20:26] gangManagement.js: {
  "name": "PulykaMan 1",
  "task": "Territory Warfare",
  "earnedRespect": 2.9799895285394546,
  "hack": 11,
  "str": 37,
  "def": 37,
  "dex": 38,
  "agi": 36,
  "cha": 8,
  "hack_exp": 204.79631473175658,
  "str_exp": 1130.3421239601157,
  "def_exp": 1123.653743437488,
  "dex_exp": 1168.6927508002727,
  "agi_exp": 1084.797335818511,
  "cha_exp": 143.96524893912647,
  "hack_mult": 1,
  "str_mult": 1,
  "def_mult": 1,
  "dex_mult": 1,
  "agi_mult": 1,
  "cha_mult": 1,
  "hack_asc_mult": 1,
  "str_asc_mult": 1,
  "def_asc_mult": 1,
  "dex_asc_mult": 1,
  "agi_asc_mult": 1,
  "cha_asc_mult": 1,
  "hack_asc_points": 0,
  "str_asc_points": 0,
  "def_asc_points": 0,
  "dex_asc_points": 0,
  "agi_asc_points": 0,
  "cha_asc_points": 0,
  "upgrades": [],
  "augmentations": [],
  "respectGain": 0,
  "wantedLevelGain": 0,
  "moneyGain": 0
}



[2021-12-24 11:18:26] gangManagement.js: {
  "faction": "Slum Snakes",
  "isHacking": false,
  "moneyGainRate": 29.192030692209247,
  "power": 1.0861654135338346,
  "respect": 20.52223577493765,
  "respectGainRate": 0.005160955964500447,
  "territory": 0.14285714285714285,
  "territoryClashChance": 0,
  "territoryWarfareEngaged": false,
  "wantedLevel": 2.1390222618020354,
  "wantedLevelGainRate": 0.00005266110829131204,
  "wantedPenalty": 0.9056088475611488
}

[2021-12-24 11:18:26] gangManagement.js: {
  "Slum Snakes": {
    "power": 1.0861654135338346,
    "territory": 0.14285714285714285
  },
  "Tetrads": {
    "power": 4.148852355321243,
    "territory": 0.1423332530173591
  },
  "The Syndicate": {
    "power": 4.131365668743624,
    "territory": 0.1417915528545955
  },
  "The Dark Army": {
    "power": 3.6494947308114334,
    "territory": 0.14078266774052095
  },
  "Speakers for the Dead": {
    "power": 11.627908761187872,
    "territory": 0.14472252626876536
  },
  "NiteSec": {
    "power": 3.894186197274474,
    "territory": 0.14167293114681778
  },
  "The Black Hand": {
    "power": 9.13077552865616,
    "territory": 0.1458399261147984
  }
}

*/