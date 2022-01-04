import * as commonLib from "commonLib.js";
import {getNestedServersList} from "commonLib.js";

const CITY_SECTOR_12 = "Sector-12";
const CITY_CHONGQING = "Chongqing";
const CITY_NEW_TOKYO = "New Tokyo";
const CITY_ISHIMA = "Ishima";
const CITY_AEVUM = "Aevum";
const CITY_VOLHAVEN = "Volhaven";

const FACTION_CYBERSEC = "CyberSec";
const FACTION_TIAN_DI_HUI = "Tian Di Hui";
const FACTION_NETBURNERS = "Netburners";

const FACTION_SECTOR_12 = "Sector-12";
const FACTION_CHONGQING = "Chongqing";
const FACTION_NEW_TOKYO = "New Tokyo";
const FACTION_ISHIMA = "Ishima";
const FACTION_AEVUM = "Aevum";
const FACTION_VOLHAVEN = "Volhaven";

const FACTION_NITESEC = "NiteSec";
const FACTION_THE_BLACK_HAND = "The Black Hand";
const FACTION_BITRUNNERS = "BitRunners";

const FACTION_ECORP = "ECorp";
const FACTION_MEGACORP = "MegaCorp";
const FACTION_KUAIGONG_INTERNATIONAL = "KuaiGong International";
const FACTION_FOUR_SIGMA = "Four Sigma";
const FACTION_NWO = "NWO";
const FACTION_BLADE_INDUSTRIES = "Blade Industries";
const FACTION_OMNITEK_INCORPORATED = "OmniTek Incorporated";
const FACTION_BACHMAN_ASSOCIATES = "Bachman & Associates";
const FACTION_CLARKE_INCORPORATED = "Clarke Incorporated";
const FACTION_FULCRUM_SECRET_TECHNOLOGIES = "Fulcrum Secret Technologies";

const FACTION_SLUM_SNAKES = "Slum Snakes";
const FACTION_TETRADS = "Tetrads";
const FACTION_SILHOUETTE = "Silhouette";
const FACTION_SPEAKERS_FOR_THE_DEAD = "Speakers for the Dead";
const FACTION_THE_DARK_ARMY = "The Dark Army";
const FACTION_THE_SYNDICATE = "The Syndicate";

const FACTION_THE_COVENANT = "The Covenant";
const FACTION_DAEDALUS = "Daedalus";
const FACTION_ILLUMINATI = "Illuminati";

const CRIME_HOMICIDE = "Homicide";

const FACTIONS_EARLY_GAME = [
    FACTION_CYBERSEC,
    FACTION_TIAN_DI_HUI,
    FACTION_NETBURNERS,
];

const FACTIONS_CITIES = [
    FACTION_SECTOR_12,
    FACTION_CHONGQING,
    FACTION_NEW_TOKYO,
    FACTION_ISHIMA,
    FACTION_AEVUM,
    FACTION_VOLHAVEN,
];

const FACTIONS_HACKER_GROUPS = [
    FACTION_NITESEC,
    FACTION_THE_BLACK_HAND,
    FACTION_BITRUNNERS,
];

const FACTIONS_MEGACORPORATIONS = [
    FACTION_ECORP,
    FACTION_MEGACORP,
    FACTION_KUAIGONG_INTERNATIONAL,
    FACTION_FOUR_SIGMA,
    FACTION_NWO,
    FACTION_BLADE_INDUSTRIES,
    FACTION_OMNITEK_INCORPORATED,
    FACTION_BACHMAN_ASSOCIATES,
    FACTION_CLARKE_INCORPORATED,
    FACTION_FULCRUM_SECRET_TECHNOLOGIES,
];

const FACTIONS_CRIMINAL_ORGANIZATIONS = [
    FACTION_SLUM_SNAKES,
    FACTION_TETRADS,
    FACTION_SILHOUETTE,
    FACTION_SPEAKERS_FOR_THE_DEAD,
    FACTION_THE_DARK_ARMY,
    FACTION_THE_SYNDICATE,
];

const FACTIONS_ENDGAME = [
    FACTION_THE_COVENANT,
    FACTION_DAEDALUS,
    FACTION_ILLUMINATI,
];

const FACTIONS_DONT_AUTO_JOIN = [
    FACTION_SECTOR_12,
    FACTION_CHONGQING,
    FACTION_NEW_TOKYO,
    FACTION_ISHIMA,
    FACTION_AEVUM,
    FACTION_VOLHAVEN,
];

const FACTIONS_PREFERRED_ORDER = [
    FACTION_CYBERSEC,
    FACTION_TIAN_DI_HUI,
    FACTION_NITESEC,
    FACTION_SECTOR_12,
    FACTION_CHONGQING,
    FACTION_NEW_TOKYO,
    FACTION_ISHIMA,
    FACTION_VOLHAVEN,
    FACTION_THE_BLACK_HAND,
    FACTION_BITRUNNERS,

    FACTION_DAEDALUS,

    FACTION_SLUM_SNAKES,
    FACTION_TETRADS,
    FACTION_THE_SYNDICATE,
    FACTION_AEVUM,
    FACTION_SPEAKERS_FOR_THE_DEAD,
    FACTION_THE_DARK_ARMY,

    FACTION_THE_COVENANT,
    FACTION_ILLUMINATI,

];

const FACTIONS_CITY_REQUIREMENTS = {
    [FACTION_TIAN_DI_HUI]: CITY_CHONGQING,
    [FACTION_SECTOR_12]: CITY_SECTOR_12,
    [FACTION_CHONGQING]: CITY_CHONGQING,
    [FACTION_NEW_TOKYO]: CITY_NEW_TOKYO,
    [FACTION_ISHIMA]: CITY_ISHIMA,
    [FACTION_AEVUM]: CITY_AEVUM,
    [FACTION_VOLHAVEN]: CITY_VOLHAVEN,
    [FACTION_TETRADS]: CITY_CHONGQING,
    [FACTION_THE_DARK_ARMY]: CITY_CHONGQING,
    [FACTION_THE_SYNDICATE]: CITY_SECTOR_12
};

const FACTIONS_SERVER_BACKDOOR_REQUIREMENTS = {
    [FACTION_CYBERSEC]: "CSEC",
    [FACTION_NITESEC]: "avmnite-02h",
    [FACTION_THE_BLACK_HAND]: "I.I.I.I",
    [FACTION_BITRUNNERS]: "run4theh111z",
    // [FACTION_FULCRUM_SECRET_TECHNOLOGIES]: "fulcrumassets",
};

const FACTIONS_MONEY_REQUIREMENTS = {
    [FACTION_TIAN_DI_HUI]: 1000000,
    [FACTION_SECTOR_12]: 15000000,
    [FACTION_CHONGQING]: 20000000,
    [FACTION_NEW_TOKYO]: 20000000,
    [FACTION_ISHIMA]: 30000000,
    [FACTION_AEVUM]: 40000000,
    [FACTION_VOLHAVEN]: 50000000,
};

const FACTIONS_KARMA_REQUIREMENTS = {
    [FACTION_SLUM_SNAKES]: -9,
    [FACTION_TETRADS]: -18,
    [FACTION_SPEAKERS_FOR_THE_DEAD]: -45,
    [FACTION_THE_DARK_ARMY]: -45,
    [FACTION_THE_SYNDICATE]: -90,
};

const FACTIONS_PEOPLE_KILLED_REQUIREMENTS = {
    [FACTION_SLUM_SNAKES]: 0,
    [FACTION_TETRADS]: 0,
    [FACTION_SPEAKERS_FOR_THE_DEAD]: 30,
    [FACTION_THE_DARK_ARMY]: 5,
    [FACTION_THE_SYNDICATE]: 0,
}

const FACTIONS_BATTLE_STAT_REQUIREMENTS = {
    [FACTION_SLUM_SNAKES]: 30,
    [FACTION_TETRADS]: 75,
    [FACTION_SPEAKERS_FOR_THE_DEAD]: 300,
    [FACTION_THE_DARK_ARMY]: 300,
    [FACTION_THE_SYNDICATE]: 200,
    [FACTION_THE_COVENANT]: 850,
    [FACTION_ILLUMINATI]: 1200,
}

const FACTIONS_EXCLUSIONS = {
    [FACTION_SECTOR_12]: [
        FACTION_CHONGQING,
        FACTION_ISHIMA,
        FACTION_NEW_TOKYO,
        FACTION_VOLHAVEN,
    ],
    [FACTION_CHONGQING]: [
        FACTION_SECTOR_12,
        FACTION_AEVUM,
        FACTION_VOLHAVEN,
    ],
    [FACTION_NEW_TOKYO]: [
        FACTION_SECTOR_12,
        FACTION_AEVUM,
        FACTION_VOLHAVEN,
    ],
    [FACTION_ISHIMA]: [
        FACTION_SECTOR_12,
        FACTION_AEVUM,
        FACTION_VOLHAVEN,
    ],
    [FACTION_AEVUM]: [
        FACTION_CHONGQING,
        FACTION_ISHIMA,
        FACTION_NEW_TOKYO,
        FACTION_VOLHAVEN,
    ],
    [FACTION_VOLHAVEN]: [
        FACTION_SECTOR_12,
        FACTION_CHONGQING,
        FACTION_ISHIMA,
        FACTION_NEW_TOKYO,
        FACTION_AEVUM,
    ],
};

const LOCATION_ROTHMAN_UNIVERSITY = "Rothman University";
const LOCATION_POWERHOUSE_GYM = "Powerhouse Gym";

const COURSE_ALGORITHMS = "Algorithms";
const COURSE_LEADERSHIP = "Leadership";

const WORKOUT_STRENGTH = "Strength";
const WORKOUT_DEFENSE = "Defense";
const WORKOUT_DEXTERITY = "Dexterity";
const WORKOUT_AGILITY = "Agility";

const AUGMENTATION_NEUROFLUX_GOVERNOR = "NeuroFlux Governor";

const SINGULARITY_PROGRAMS = {
    "AutoLink.exe": "25",
    "BruteSSH.exe": "50",
    "ServerProfiler.exe": "75",
    "DeepscanV1.exe": "75",
    "FTPCrack.exe": "100",
    "relaySMTP.exe": "250",
    "DeepscanV2.exe": "400",
    "HTTPWorm.exe": "500",
    "SQLInject.exe": "750",
};

const SERVER_WORLD_DAEMON = "w0r1d_d43m0n";
const SINGULARITY_TRAINING_BASE_STAT = 5;
const SINGULARITY_TRAINING_HARD_THRESHOLD = 1;
const SINGULARITY_FACTION_FAVOR_GAIN_THRESHOLD = 75;
const SINGULARITY_FACTION_DONATE_MONEY_SAFETY_MARGIN = 3;
const SINGULARITY_BUY_PROGRAMS = true;

/** @param {import(".").NS } ns */
export async function main(ns) {
    // ns.toast("Starting singularity management", "info");

    if (commonLib.getServersList(ns).includes(SERVER_WORLD_DAEMON)) {
        let wdRequiredHackLevel = ns.getServerRequiredHackingLevel(SERVER_WORLD_DAEMON);
        if (ns.getHackingLevel() < wdRequiredHackLevel) {
            ns.toast(SERVER_WORLD_DAEMON + " is on the horizon. " + wdRequiredHackLevel + " levels of hack needed to escape!");
        } else if (!ns.hasRootAccess(SERVER_WORLD_DAEMON)) {
            ns.toast("No root access for " + SERVER_WORLD_DAEMON + " yet :(", "error");
        } else {
            let pathToServer = commonLib.getPathToServer(ns, SERVER_WORLD_DAEMON);
            ns.connect("home");
            for (let i = 0; i < pathToServer.length; i++) {
                ns.connect(pathToServer[i]);
            }
            await ns.installBackdoor();
            ns.exit();
        }
    }

    // autoJoinFactions(ns);
    await handleBackdoorPreReqs(ns);

    if (ns.getPlayer().workType === "Working on Create a Program" || ns.getPlayer().workType === "Committing a crime") {
        ns.exit();
    }

    let nextFaction = getNextTargetFaction(ns);
    doTrainings(ns, nextFaction);
    await handleFactionKarmaPreReqs(ns);
    getMissingPrograms(ns);

    handleFactionTravelPreReqs(ns);

    if (nextFaction) {
        await handleFaction(ns, nextFaction);
    }

    ns.commitCrime(CRIME_HOMICIDE);
    await ns.asleep(3000);
    ns.commitCrime(CRIME_HOMICIDE);
    await ns.asleep(3000);
    ns.commitCrime(CRIME_HOMICIDE);

    // ns.commitCrime("Assassinate");
}

/** @param {import(".").NS } ns */
function autoJoinFactions(ns) {
    let factionsToJoin = ns.checkFactionInvitations();
    for (let i = 0 ; i < factionsToJoin.length ; i++) {
        let faction = factionsToJoin[i];

        if (!FACTIONS_DONT_AUTO_JOIN.includes(faction) || getUnboughtAugmentsFromFaction(ns, faction).length) {
            ns.joinFaction(faction);
            ns.toast("Joined faction: " + faction);
        }
    }
}

/** @param {import(".").NS } ns */
function getMissingPrograms(ns) {
    let objectKeys = Object.keys(SINGULARITY_PROGRAMS);
    let hackLevel = ns.getPlayer().hacking;

    for (let j = 0 ; j < objectKeys.length ; j++) {
        let programName = objectKeys[j];
        let programMinHackLevel = SINGULARITY_PROGRAMS[programName];
        if (!commonLib.isProgramAvailable(ns, programName)) {
            if (!SINGULARITY_BUY_PROGRAMS && hackLevel >= programMinHackLevel * 10) {
                ns.createProgram(programName);
                ns.exit();
            } else if (SINGULARITY_BUY_PROGRAMS && ns.getPlayer().tor) {
                if (ns.purchaseProgram(programName)) {
                    ns.toast("Bought program: " + programName)
                }
            }
        }
    }
}

/** @param {import(".").NS } ns
 * @param {string} nextFaction
 */
function doTrainings(ns, nextFaction) {
    let p = ns.getPlayer();

    let targetHackingLevel = SINGULARITY_TRAINING_BASE_STAT * p.hacking_exp_mult * p.hacking_mult;
    let targetStrLevel = SINGULARITY_TRAINING_BASE_STAT * p.strength_exp_mult * p.strength_mult;
    let targetDefLevel = SINGULARITY_TRAINING_BASE_STAT * p.defense_exp_mult * p.defense_mult;
    let targetDexLevel = SINGULARITY_TRAINING_BASE_STAT * p.dexterity_exp_mult * p.dexterity_mult;
    let targetAgiLevel = SINGULARITY_TRAINING_BASE_STAT * p.agility_exp_mult * p.agility_mult;
    let targetChaLevel = SINGULARITY_TRAINING_BASE_STAT * p.charisma_exp_mult * p.charisma_mult;

    if (nextFaction in FACTIONS_BATTLE_STAT_REQUIREMENTS) {
        let battleStatRequirement = FACTIONS_BATTLE_STAT_REQUIREMENTS[nextFaction];
        targetStrLevel = Math.max(targetStrLevel, battleStatRequirement);
        targetDefLevel = Math.max(targetDefLevel, battleStatRequirement);
        targetDexLevel = Math.max(targetDexLevel, battleStatRequirement);
        targetAgiLevel = Math.max(targetAgiLevel, battleStatRequirement);
    }

    if (p.hacking < targetHackingLevel) {
        travelIfNeeded(ns, CITY_SECTOR_12);
        ns.toast("Training hack until: " + targetHackingLevel, "info");
        //todo: check taking algo course
        ns.universityCourse(LOCATION_ROTHMAN_UNIVERSITY, COURSE_ALGORITHMS);
        ns.exit();
    } else if (p.strength < targetStrLevel || p.strength < SINGULARITY_TRAINING_HARD_THRESHOLD) {
        travelIfNeeded(ns, CITY_SECTOR_12);
        ns.toast("Training str until: " + targetStrLevel, "info");
        if (ns.getPlayer().workType !== "Studying or Taking a class at university" || ns.getPlayer().className !== "training your strength at a gym") {
            ns.gymWorkout(LOCATION_POWERHOUSE_GYM, WORKOUT_STRENGTH);
        }
        ns.exit();
    } else if (p.defense < targetDefLevel || p.defense < SINGULARITY_TRAINING_HARD_THRESHOLD) {
        travelIfNeeded(ns, CITY_SECTOR_12);
        ns.toast("Training def until: " + targetDefLevel, "info");
        if (ns.getPlayer().workType !== "Studying or Taking a class at university" || ns.getPlayer().className !== "training your defense at a gym") {
            ns.gymWorkout(LOCATION_POWERHOUSE_GYM, WORKOUT_DEFENSE);
        }
        ns.exit();
    } else if (p.dexterity < targetDexLevel || p.dexterity < SINGULARITY_TRAINING_HARD_THRESHOLD) {
        travelIfNeeded(ns, CITY_SECTOR_12);
        ns.toast("Training dex until: " + targetDexLevel, "info");
        if (ns.getPlayer().workType !== "Studying or Taking a class at university" || ns.getPlayer().className !== "training your dexterity at a gym") {
            ns.gymWorkout(LOCATION_POWERHOUSE_GYM, WORKOUT_DEXTERITY);
        }
        ns.exit();
    } else if (p.agility < targetAgiLevel || p.agility < SINGULARITY_TRAINING_HARD_THRESHOLD) {
        travelIfNeeded(ns, CITY_SECTOR_12);
        ns.toast("Training agi until: " + targetAgiLevel, "info");
        if (ns.getPlayer().workType !== "Studying or Taking a class at university" || ns.getPlayer().className !== "training your agility at a gym") {
            ns.gymWorkout(LOCATION_POWERHOUSE_GYM, WORKOUT_AGILITY);
        }
        ns.exit();
    } else if (p.charisma < targetChaLevel) {
        travelIfNeeded(ns, CITY_SECTOR_12);
        ns.toast("Training cha until: " + targetChaLevel, "info");
        //todo: check taking leadership course
        ns.universityCourse(LOCATION_ROTHMAN_UNIVERSITY, COURSE_LEADERSHIP);
        ns.exit();
    } else if (ns.getPlayer().className !== undefined && ns.getPlayer().className !== "") {
        ns.stopAction();
    }
}

/** @param {import(".").NS } ns */
async function handleFactionKarmaPreReqs(ns) {
    for (let i = 0; i < FACTIONS_PREFERRED_ORDER.length; i++) {
        let factionName = FACTIONS_PREFERRED_ORDER[i];

        if (
            ns.getPlayer().factions.includes(factionName)
            || !(factionName in FACTIONS_KARMA_REQUIREMENTS)
            || getUnboughtAugmentsFromFaction(ns, factionName).length === 0
        ) {
            continue;
        }

        let requiredKills = Math.max(Math.abs(FACTIONS_KARMA_REQUIREMENTS[factionName] / 3), FACTIONS_PEOPLE_KILLED_REQUIREMENTS[factionName]);
        let numPeopleKilled = ns.getPlayer().numPeopleKilled;

        if (numPeopleKilled < requiredKills) {
            ns.commitCrime(CRIME_HOMICIDE);
            await ns.asleep(3000);
            ns.commitCrime(CRIME_HOMICIDE);
            await ns.asleep(3000);
            ns.commitCrime(CRIME_HOMICIDE);
            ns.exit();
        }
    }
}

/** @param {import(".").NS } ns */
function handleFactionTravelPreReqs(ns) {
    for (let i = 0 ; i < FACTIONS_PREFERRED_ORDER.length ; i++) {
        let factionName = FACTIONS_PREFERRED_ORDER[i];

        if (
            ns.getPlayer().factions.includes(factionName)
            || !(factionName in FACTIONS_CITY_REQUIREMENTS)
            || getUnboughtAugmentsFromFaction(ns, factionName).length === 0
        ) {
            continue;
        }

        if (factionName in FACTIONS_EXCLUSIONS) {
            let excludingFactions = FACTIONS_EXCLUSIONS[factionName];
            let isExcluded = false;
            for (let j = 0 ; j < excludingFactions.length ; j++) {
                if (ns.getPlayer().factions.includes(excludingFactions[j])) {
                    isExcluded = true;
                }
            }
            if (isExcluded) {
                continue;
            }
        }

        travelIfNeeded(ns, FACTIONS_CITY_REQUIREMENTS[factionName]);
        return;
    }

    travelIfNeeded(ns, CITY_SECTOR_12);
}
/** @param {import(".").NS } ns */
async function handleBackdoorPreReqs(ns) {
    let backdoorFactions = Object.keys(FACTIONS_SERVER_BACKDOOR_REQUIREMENTS);
    for (let i = 0 ; i < backdoorFactions.length ; i++) {
        let factionName = backdoorFactions[i];
        let targetServer = FACTIONS_SERVER_BACKDOOR_REQUIREMENTS[factionName];

        if (
            ns.getPlayer().factions.includes(factionName)
            || !commonLib.getRootServersList(ns).includes(targetServer)
        ) {
            continue;
        }

        let pathToServer = commonLib.getPathToServer(ns, targetServer);
        ns.connect("home");
        for (let i = 0; i < pathToServer.length; i++) {
            ns.connect(pathToServer[i]);
        }
        await ns.installBackdoor();
        ns.connect("home");
    }
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 */
async function handleFaction(ns, factionName) {
    if (!ns.getPlayer().factions.includes(factionName)) {
        return;
    }

    let highestAugmentRepReq = getHighestAugmentRepReqForFaction(ns, factionName);
    let factionFavor = ns.getFactionFavor(factionName);
    let favorToDonate = ns.getFavorToDonate();
    let factionRep = ns.getFactionRep(factionName);

    if (factionFavor >= favorToDonate && factionRep < highestAugmentRepReq) {
        let moneyToSafelyDonate = ns.getPlayer().money / SINGULARITY_FACTION_DONATE_MONEY_SAFETY_MARGIN;
        let factionRepMult = ns.getPlayer().faction_rep_mult;
        let possibleRepGain = (moneyToSafelyDonate / 1e6) * factionRepMult;
        let missingRep = highestAugmentRepReq - factionRep;

        if (highestAugmentRepReq <= factionRep + possibleRepGain) {
            let moneyToDonate = missingRep / factionRepMult * 1e6;
            ns.toast(ns.sprintf("Donating %d money to gain %d reputation!", moneyToDonate, missingRep));
            ns.stopAction();
            ns.donateToFaction(factionName, moneyToDonate);
        }
    }

    if (
        getHighestAugmentRepReqForFaction(ns, factionName) <= ns.getFactionRep(factionName)
        || ns.getFactionFavorGain(factionName) >= SINGULARITY_FACTION_FAVOR_GAIN_THRESHOLD
        || (
            ns.getFactionFavor(factionName) < ns.getFavorToDonate()
            && ns.getFactionFavorGain(factionName) + ns.getFactionFavor(factionName) >= ns.getFavorToDonate()
        )
    ) {
        ns.stopAction();

        while (getUnboughtEnoughRepAugmentsFromFaction(ns, factionName).length) {
            if (ns.getPlayer().money < getEnoughRepHighestAugmentPriceForFaction(ns, factionName)) {
                return;
            }
            let nextAug = getEnoughRepMostExpensiveAugmentForFaction(ns, factionName);
            if (nextAug === "" || nextAug === undefined) {
                ns.toast("EMPTY AUG :(", "error");
                return;
            }

            let prereq = ns.getAugmentationPrereq(nextAug);
            if (prereq.length) {
                for (let j = 0; j < prereq.length; j++) {
                    if (ns.getOwnedAugmentations(true).includes(prereq[j])) {
                        continue;
                    }

                    if (!ns.purchaseAugmentation(factionName, prereq[j])) {
                        return;
                    }
                }
            }
            await ns.asleep(1);
            if (ns.purchaseAugmentation(factionName, nextAug)) {
                ns.toast("Bought augmentation: " + nextAug);
            } else {
                ns.toast("Error buying augmentation: " + nextAug, "error");
                return;
            }
        }

        let numberOfNf = buyMaxNumberOfNf(ns, factionName);
        if (
            ns.getOwnedAugmentations(true).length > ns.getOwnedAugmentations(false).length
            || numberOfNf > 0
        ) {
            await ns.asleep(1);
            ns.installAugmentations("init.js");
            await ns.asleep(1);
            ns.exit();
        } else {
            await ns.sleep(1);
            ns.softReset("init.js");
            await ns.sleep(1);
            ns.exit();
        }
    }

    if (!ns.workForFaction(factionName, "Hacking Contracts")) {
        ns.workForFaction(factionName, "Security Work");
    }

    ns.exit();
}

/** @param {import(".").NS } ns */
function getNextTargetFaction(ns) {
    for (let i = 0 ; i < FACTIONS_PREFERRED_ORDER.length ; i++) {
        let nextFaction = FACTIONS_PREFERRED_ORDER[i];

        if (getUnboughtAugmentsFromFaction(ns, nextFaction).length) {
            return nextFaction;
        }
    }
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 */
function getHighestAugmentRepReqForFaction(ns, factionName) {
    let highestRepReq = 0;
    let unboughtAugmentsFromFaction = getUnboughtAugmentsFromFaction(ns, factionName);

    for (let i = 0 ; i < unboughtAugmentsFromFaction.length ; i++) {
        let augment = unboughtAugmentsFromFaction[i];
        let augmentRepReq = ns.getAugmentationRepReq(augment);
        if (augmentRepReq > highestRepReq) {
            highestRepReq = augmentRepReq;
        }
    }

    return highestRepReq;
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 */
function getHighestAugmentPriceForFaction(ns, factionName) {
    let highestPrice = 0;
    let unboughtAugmentsFromFaction = getUnboughtAugmentsFromFaction(ns, factionName);

    for (let i = 0 ; i < unboughtAugmentsFromFaction.length ; i++) {
        let augment = unboughtAugmentsFromFaction[i];
        let augmentPrice = ns.getAugmentationPrice(augment);
        if (augmentPrice > highestPrice) {
            highestPrice = augmentPrice;
        }
    }

    return highestPrice;
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 */
function getEnoughRepHighestAugmentPriceForFaction(ns, factionName) {
    let highestPrice = 0;
    let unboughtAugmentsFromFaction = getUnboughtEnoughRepAugmentsFromFaction(ns, factionName);

    for (let i = 0 ; i < unboughtAugmentsFromFaction.length ; i++) {
        let augment = unboughtAugmentsFromFaction[i];
        let augmentPrice = ns.getAugmentationPrice(augment);
        if (augmentPrice > highestPrice) {
            highestPrice = augmentPrice;
        }
    }

    return highestPrice;
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 */
function getMostExpensiveAugmentForFaction(ns, factionName) {
    let highestPrice = 0;
    let unboughtAugmentsFromFaction = getUnboughtAugmentsFromFaction(ns, factionName);
    let mostExpensiveAugment = "";

    for (let i = 0 ; i < unboughtAugmentsFromFaction.length ; i++) {
        let augment = unboughtAugmentsFromFaction[i];
        let augmentPrice = ns.getAugmentationPrice(augment);
        if (augmentPrice > highestPrice) {
            highestPrice = augmentPrice;
            mostExpensiveAugment = augment;
        }
    }

    return mostExpensiveAugment;
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 */
function getEnoughRepMostExpensiveAugmentForFaction(ns, factionName) {
    let highestPrice = 0;
    let unboughtAugmentsFromFaction = getUnboughtEnoughRepAugmentsFromFaction(ns, factionName);
    let mostExpensiveAugment = "";

    for (let i = 0 ; i < unboughtAugmentsFromFaction.length ; i++) {
        let augment = unboughtAugmentsFromFaction[i];
        let augmentPrice = ns.getAugmentationPrice(augment);
        if (augmentPrice >= highestPrice) {
            highestPrice = augmentPrice;
            mostExpensiveAugment = augment;
        }
    }

    return mostExpensiveAugment;
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 */
function getUnboughtAugmentsFromFaction(ns, factionName) {
    return ns.getAugmentationsFromFaction(factionName).filter(x => !ns.getOwnedAugmentations(true).includes(x));
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 */
function getUnboughtEnoughRepAugmentsFromFaction(ns, factionName) {
    let unboughtAugments = getUnboughtAugmentsFromFaction(ns, factionName);
    let factionRep = ns.getFactionRep(factionName)

    for (let i = 0 ; i < unboughtAugments.length ; i++) {
        let augment = unboughtAugments[i];
        if (ns.getAugmentationRepReq(augment) > factionRep) {
            unboughtAugments.splice(i, 1);
            i--;
        }
    }

    return unboughtAugments;
}

/** @param {import(".").NS } ns
 * @param {string} factionName
 */
function buyMaxNumberOfNf(ns, factionName) {
    let numberOfNf = 0;
    while(ns.purchaseAugmentation(factionName, AUGMENTATION_NEUROFLUX_GOVERNOR)){
        numberOfNf++;
    }
    if (numberOfNf > 0) {
        ns.toast(ns.sprintf("Bought %d levels of %s", numberOfNf, AUGMENTATION_NEUROFLUX_GOVERNOR));
    }
    return numberOfNf;
}

/** @param {import(".").NS } ns
 * @param {string} city
 */
function travelIfNeeded(ns, city) {
    if (ns.getPlayer().city !== city && ns.getPlayer().money >= 200000) {
        ns.toast("Welcome to " + city + "!!!");
        return ns.travelToCity(city);
    }
    return false;
}