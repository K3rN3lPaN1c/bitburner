//-----------
//- SCRIPTS -
//-----------
//export const SCRIPTS_BASE_URL = "https://raw.githubusercontent.com/K3rN3lPaN1c/bitburner/feature/kuvee-ns-scripts/src/ns2/";
export const SCRIPTS_BASE_URL = "file:///C:/Bitburner/bitburner/src/ns2/";

export const CREATED_SCRIPT_GROW = "grow.script";
export const CREATED_SCRIPT_WEAKEN = "weaken.script";
export const CREATED_SCRIPT_HACK = "hack.script";

export const SCRIPT_DISPATCHER = "dispatcher.js";

export const SCRIPT_SET_NEXT_TARGET_FACTION = "setNextTargetFaction.js";

export const SCRIPT_INFINITE_ATTACK = "infiniteAttack.js";

export const SCRIPT_NETWORK_DISCOVERY = "networkDiscoveryAndGainingRootAccess.js";
export const SCRIPT_ATTACK_ALL_SERVERS = "attackAllServers.js";
export const SCRIPT_MANAGE_PURCHASED_SERVERS = "managePurchasedServers.js";
export const SCRIPT_GANG_MANAGEMENT = "gangManagement.js"; //TODO: Refactor
export const SCRIPT_HACKNET_NODE_MANAGEMENT = "hacknetNodeManagement.js";  //TODO: Refactor

export const SCRIPT_SINGULARITY_PHYSICAL_MANAGEMENT = "singularity_handlePhysicalPurchases.js";
export const SCRIPT_SINGULARITY_ESCAPE_THE_BITNODE = "singularity_escapeTheBitnode.js";
export const SCRIPT_SINGULARITY_AUTO_JOIN_FACTIONS = "singularity_autoJoinFactions.js";
export const SCRIPT_SINGULARITY_HANDLE_BACKDOOR_PRE_REQS = "singularity_handleBackdoorPreReqs.js";
export const SCRIPT_SINGULARITY_HANDLE_TRAININGS = "singularity_handleTrainings.js";
export const SCRIPT_SINGULARITY_HANDLE_KARMA_PRE_REQS = "singularity_handleFactionKarmaPreReqs.js";
export const SCRIPT_SINGULARITY_HANDLE_TRAVEL_PRE_REQS = "singularity_handleFactionTravelPreReqs.js";
export const SCRIPT_SINGULARITY_HANDLE_MISSING_PROGRAMS = "singularity_handleMissingPrograms.js";
export const SCRIPT_SINGULARITY_HANDLE_FACTION_DONATIONS = "singularity_handleFactionDonation.js";
export const SCRIPT_SINGULARITY_HANDLE_AUGMENT_INSTALLATIONS = "singularity_handleAugmentInstallations.js";
export const SCRIPT_SINGULARITY_HANDLE_FACTION_WORK = "singularity_handleFactionWork.js";
export const SCRIPT_SINGULARITY_DO_CRIMES = "singularity_doCrimes.js";

export const SCRIPT_UTIL_SHOW_SERVER_MAP = "showServerMap.js";

export const CREATED_SCRIPTS = [
    CREATED_SCRIPT_GROW,
    CREATED_SCRIPT_WEAKEN,
    CREATED_SCRIPT_HACK,
]

export const SCRIPTS = [
    "init.js",
    "ServerDetails.js",
    "ServerDetailsCollection.js",

    "lib_constants.js",

    "lib_disableLogs.js",
    "lib_downloadAllFiles.js",
    "lib_nestedServerList.js",
    "lib_pathToServer.js",
    "lib_rootServerList.js",
    "lib_serverList.js",
    "lib_syncRun.js",
    "lib_targetGroupedServerProcesses.js",

    "lib_singularity_highestAugmentRepReqForFaction.js",
    "lib_singularity_travelIfNeeded.js",
    "lib_singularity_unboughtAugmentsFromFaction.js",
    "lib_singularity_unboughtEnoughRepAugmentsFromFaction.js",

    SCRIPT_DISPATCHER,
    SCRIPT_SET_NEXT_TARGET_FACTION,

    SCRIPT_INFINITE_ATTACK,
    SCRIPT_NETWORK_DISCOVERY,
    SCRIPT_ATTACK_ALL_SERVERS,
    SCRIPT_MANAGE_PURCHASED_SERVERS,
    SCRIPT_GANG_MANAGEMENT,
    SCRIPT_HACKNET_NODE_MANAGEMENT,

    SCRIPT_SINGULARITY_PHYSICAL_MANAGEMENT,
    SCRIPT_SINGULARITY_AUTO_JOIN_FACTIONS,
    SCRIPT_SINGULARITY_ESCAPE_THE_BITNODE,
    SCRIPT_SINGULARITY_HANDLE_BACKDOOR_PRE_REQS,
    SCRIPT_SINGULARITY_HANDLE_TRAININGS,
    SCRIPT_SINGULARITY_HANDLE_KARMA_PRE_REQS,
    SCRIPT_SINGULARITY_HANDLE_MISSING_PROGRAMS,
    SCRIPT_SINGULARITY_HANDLE_TRAVEL_PRE_REQS,
    SCRIPT_SINGULARITY_HANDLE_FACTION_DONATIONS,
    SCRIPT_SINGULARITY_HANDLE_AUGMENT_INSTALLATIONS,
    SCRIPT_SINGULARITY_HANDLE_FACTION_WORK,
    SCRIPT_SINGULARITY_DO_CRIMES,
];

//-----------
//- SERVERS -
//-----------

export const SERVER_HOME = "home";
export const SERVER_WORLD_DAEMON = "w0r1d_d43m0n";

//------------
//- PROGRAMS -
//------------

export const PROGRAM_BRUTESSH = "BruteSSH.exe";
export const PROGRAM_FTPCRACK = "FTPCrack.exe";
export const PROGRAM_RELAYSMTP = "relaySMTP.exe";
export const PROGRAM_HTTPWORM = "HTTPWorm.exe";
export const PROGRAM_SQLINJECT = "SQLInject.exe";

export const PROGRAM_NAMES = [
    PROGRAM_BRUTESSH,
    PROGRAM_FTPCRACK,
    PROGRAM_RELAYSMTP,
    PROGRAM_HTTPWORM,
    PROGRAM_SQLINJECT,
];

//------------
//- CITIES -
//------------

export const CITY_SECTOR_12 = "Sector-12";
export const CITY_CHONGQING = "Chongqing";
export const CITY_NEW_TOKYO = "New Tokyo";
export const CITY_ISHIMA = "Ishima";
export const CITY_AEVUM = "Aevum";
export const CITY_VOLHAVEN = "Volhaven";

//------------
//- FACTIONS -
//------------

export const FACTION_CYBERSEC = "CyberSec";
export const FACTION_TIAN_DI_HUI = "Tian Di Hui";
export const FACTION_NETBURNERS = "Netburners";

export const FACTION_SECTOR_12 = "Sector-12";
export const FACTION_CHONGQING = "Chongqing";
export const FACTION_NEW_TOKYO = "New Tokyo";
export const FACTION_ISHIMA = "Ishima";
export const FACTION_AEVUM = "Aevum";
export const FACTION_VOLHAVEN = "Volhaven";

export const FACTION_NITESEC = "NiteSec";
export const FACTION_THE_BLACK_HAND = "The Black Hand";
export const FACTION_BITRUNNERS = "BitRunners";

export const FACTION_ECORP = "ECorp";
export const FACTION_MEGACORP = "MegaCorp";
export const FACTION_KUAIGONG_INTERNATIONAL = "KuaiGong International";
export const FACTION_FOUR_SIGMA = "Four Sigma";
export const FACTION_NWO = "NWO";
export const FACTION_BLADE_INDUSTRIES = "Blade Industries";
export const FACTION_OMNITEK_INCORPORATED = "OmniTek Incorporated";
export const FACTION_BACHMAN_ASSOCIATES = "Bachman & Associates";
export const FACTION_CLARKE_INCORPORATED = "Clarke Incorporated";
export const FACTION_FULCRUM_SECRET_TECHNOLOGIES = "Fulcrum Secret Technologies";

export const FACTION_SLUM_SNAKES = "Slum Snakes";
export const FACTION_TETRADS = "Tetrads";
export const FACTION_SILHOUETTE = "Silhouette";
export const FACTION_SPEAKERS_FOR_THE_DEAD = "Speakers for the Dead";
export const FACTION_THE_DARK_ARMY = "The Dark Army";
export const FACTION_THE_SYNDICATE = "The Syndicate";

export const FACTION_THE_COVENANT = "The Covenant";
export const FACTION_DAEDALUS = "Daedalus";
export const FACTION_ILLUMINATI = "Illuminati";

export const FACTIONS_EARLY_GAME = [
    FACTION_CYBERSEC,
    FACTION_TIAN_DI_HUI,
    FACTION_NETBURNERS,
];

export const FACTIONS_CITIES = [
    FACTION_SECTOR_12,
    FACTION_CHONGQING,
    FACTION_NEW_TOKYO,
    FACTION_ISHIMA,
    FACTION_AEVUM,
    FACTION_VOLHAVEN,
];

export const FACTIONS_HACKER_GROUPS = [
    FACTION_NITESEC,
    FACTION_THE_BLACK_HAND,
    FACTION_BITRUNNERS,
];

export const FACTIONS_MEGACORPORATIONS = [
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

export const FACTIONS_CRIMINAL_ORGANIZATIONS = [
    FACTION_SLUM_SNAKES,
    FACTION_TETRADS,
    FACTION_SILHOUETTE,
    FACTION_SPEAKERS_FOR_THE_DEAD,
    FACTION_THE_DARK_ARMY,
    FACTION_THE_SYNDICATE,
];

export const FACTIONS_ENDGAME = [
    FACTION_THE_COVENANT,
    FACTION_DAEDALUS,
    FACTION_ILLUMINATI,
];

export const FACTIONS_DONT_AUTO_JOIN = [
    FACTION_SECTOR_12,
    FACTION_CHONGQING,
    FACTION_NEW_TOKYO,
    FACTION_ISHIMA,
    FACTION_AEVUM,
    FACTION_VOLHAVEN,
];

export const FACTIONS_PREFERRED_ORDER = [
    FACTION_CYBERSEC,
    FACTION_TIAN_DI_HUI,
    FACTION_NITESEC,
    FACTION_SECTOR_12,
    FACTION_CHONGQING,
    FACTION_NEW_TOKYO,
    FACTION_ISHIMA,
    FACTION_THE_BLACK_HAND,
    FACTION_BITRUNNERS,
    FACTION_VOLHAVEN,

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

export const FACTIONS_CITY_REQUIREMENTS = {
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

export const FACTIONS_SERVER_BACKDOOR_REQUIREMENTS = {
    [FACTION_CYBERSEC]: "CSEC",
    [FACTION_NITESEC]: "avmnite-02h",
    [FACTION_THE_BLACK_HAND]: "I.I.I.I",
    [FACTION_BITRUNNERS]: "run4theh111z",
    // [FACTION_FULCRUM_SECRET_TECHNOLOGIES]: "fulcrumassets",
};

export const FACTIONS_MONEY_REQUIREMENTS = {
    [FACTION_TIAN_DI_HUI]: 1000000,
    [FACTION_SECTOR_12]: 15000000,
    [FACTION_CHONGQING]: 20000000,
    [FACTION_NEW_TOKYO]: 20000000,
    [FACTION_ISHIMA]: 30000000,
    [FACTION_AEVUM]: 40000000,
    [FACTION_VOLHAVEN]: 50000000,
};

export const FACTIONS_KARMA_REQUIREMENTS = {
    [FACTION_SLUM_SNAKES]: -9,
    [FACTION_TETRADS]: -18,
    [FACTION_SPEAKERS_FOR_THE_DEAD]: -45,
    [FACTION_THE_DARK_ARMY]: -45,
    [FACTION_THE_SYNDICATE]: -90,
};

export const FACTIONS_PEOPLE_KILLED_REQUIREMENTS = {
    [FACTION_SLUM_SNAKES]: 0,
    [FACTION_TETRADS]: 0,
    [FACTION_SPEAKERS_FOR_THE_DEAD]: 30,
    [FACTION_THE_DARK_ARMY]: 5,
    [FACTION_THE_SYNDICATE]: 0,
}

export const FACTIONS_BATTLE_STAT_REQUIREMENTS = {
    [FACTION_SLUM_SNAKES]: 30,
    [FACTION_TETRADS]: 75,
    [FACTION_SPEAKERS_FOR_THE_DEAD]: 300,
    [FACTION_THE_DARK_ARMY]: 300,
    [FACTION_THE_SYNDICATE]: 200,
    [FACTION_THE_COVENANT]: 850,
    [FACTION_ILLUMINATI]: 1200,
}

export const FACTIONS_EXCLUSIONS = {
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

export const FACTIONS_REP_THRESHOLDS = {
    [FACTION_CYBERSEC]: [3750, 10000],
    [FACTION_TIAN_DI_HUI]: [10000, 75000],
    [FACTION_NITESEC]: [10000, 20000, 50000],
    [FACTION_SECTOR_12]: [12500, 50000],
    [FACTION_CHONGQING]: [10000, 25000, 50000, 100000], //TODO: CHECK
    [FACTION_NEW_TOKYO]: [10000, 25000, 50000, 100000], //TODO: CHECK
    [FACTION_ISHIMA]: [10000, 25000, 50000, 100000], //TODO: CHECK
    [FACTION_THE_BLACK_HAND]: [50000, 112500, 50000],
    [FACTION_BITRUNNERS]: [100000, 200000],
    [FACTION_VOLHAVEN]: [10000, 25000, 50000, 100000], //TODO: CHECK

    [FACTION_DAEDALUS]: [10000, 25000, 50000, 100000], //TODO: CHECK
    [FACTION_SLUM_SNAKES]: [3000, 7500],
    [FACTION_TETRADS]: [10000, 25000, 50000, 100000], //TODO: CHECK
    [FACTION_THE_SYNDICATE]: [10000, 25000, 50000, 100000], //TODO: CHECK
    [FACTION_AEVUM]: [10000, 25000, 50000, 100000], //TODO: CHECK
    [FACTION_SPEAKERS_FOR_THE_DEAD]: [10000, 25000, 50000, 100000], //TODO: CHECK
    [FACTION_THE_DARK_ARMY]: [10000, 25000, 50000, 100000], //TODO: CHECK

    [FACTION_THE_COVENANT]: [10000, 25000, 50000, 100000], //TODO: CHECK
    [FACTION_ILLUMINATI]: [10000, 25000, 50000, 100000], //TODO: CHECK
};

//-------------
//- LOCATIONS -
//-------------

export const LOCATION_ROTHMAN_UNIVERSITY = "Rothman University";
export const LOCATION_POWERHOUSE_GYM = "Powerhouse Gym";

//-----------------------------------
//- WORK TYPES / WORKOUTS / COURSES -
//-----------------------------------

export const COURSE_ALGORITHMS = "Algorithms";
export const COURSE_LEADERSHIP = "Leadership";

export const WORKOUT_STRENGTH = "Strength";
export const WORKOUT_DEFENSE = "Defense";
export const WORKOUT_DEXTERITY = "Dexterity";
export const WORKOUT_AGILITY = "Agility";

export const WORK_TYPE_CREATE_A_PROGRAM = "Working on Create a Program";
export const WORK_TYPE_WORKING_FOR_FACTION = "Working for Faction";
export const WORK_TYPE_COMMITTING_A_CRIME = "Committing a crime";
export const WORK_TYPE_LEARNING_WORKOUT = "Studying or Taking a class at university";

export const WORK_FACTION_HACKING_CONTRACTS = "Hacking Contracts";
export const WORK_FACTION_SECURITY_WORK = "Security Work";
export const WORK_FACTION_FIELD_WORK = "Field Work";

//----------
//- CRIMES -
//----------

export const CRIME_SHOPLIFT = "Shoplift";
export const CRIME_ROB_STORE = "Rob store";
export const CRIME_MUG_SOMEONE = "Mug someone";
export const CRIME_LARCENY = "Larceny";
export const CRIME_DEAL_DRUGS = "Deal Drugs";
export const CRIME_BOND_FORGERY = "Bond Forgery";
export const CRIME_TRAFFICK_ILLEGAL_ARMS = "Traffick illegal Arms";
export const CRIME_HOMICIDE = "Homicide";
export const CRIME_GRAND_THEFT_AUTO = "Grand theft Auto";
export const CRIME_KIDNAP_AND_RANSOM = "Kidnap and Ransom";
export const CRIME_ASSASSINATE = "Assassinate";
export const CRIME_HEIST = "Heist";

export const CRIMES = [
    CRIME_SHOPLIFT,
    CRIME_ROB_STORE,
    CRIME_MUG_SOMEONE,
    CRIME_LARCENY,
    CRIME_DEAL_DRUGS,
    CRIME_BOND_FORGERY,
    CRIME_TRAFFICK_ILLEGAL_ARMS,
    CRIME_HOMICIDE,
    CRIME_GRAND_THEFT_AUTO,
    CRIME_KIDNAP_AND_RANSOM,
    CRIME_ASSASSINATE,
    CRIME_HEIST,
];

export const CRIMES_PREFERRED_ORDER = [
    CRIME_HOMICIDE,
    CRIME_MUG_SOMEONE,
    CRIME_SHOPLIFT,
];

//------------
//- AUGMENTS -
//------------

export const AUGMENTATION_NEUROFLUX_GOVERNOR = "NeuroFlux Governor";

//---------
//- FLAGS -
//---------

export const FLAG_KEEP_SINGULARITY_FUNCTIONS_RUNNING = true;
export const FLAG_KEEP_SINGULARITY_WORK_FUNCTIONS_RUNNING = false;

export const FLAG_HACKNET_PURCHASE_AND_UPGRADE_NODES = false;
export const FLAG_HACKNET_SPEND_HASHES_FOR_BLADEBURNER = true;
export const FLAG_HACKNET_SPEND_HASHES_FOR_SERVER = false;
export const FLAG_HACKNET_SPEND_HASHES_FOR_TRAINING = false;

//---------------
//- SINGULARITY -
//---------------

export const SINGULARITY_TRAINING_BASE_STAT = 5;
export const SINGULARITY_TRAINING_HARD_THRESHOLD = 0;
export const SINGULARITY_FACTION_FAVOR_GAIN_THRESHOLD = 75;
export const SINGULARITY_FACTION_DONATE_MONEY_SAFETY_MARGIN = 3;
export const SINGULARITY_BUY_PROGRAMS = true;

export const SINGULARITY_WORK_TYPES_NOT_TO_INTERRUPT = [
    WORK_TYPE_CREATE_A_PROGRAM,
    WORK_TYPE_COMMITTING_A_CRIME
];

export const SINGULARITY_PROGRAMS_REQUIREMENTS = {
    "BruteSSH.exe": "50",
    "FTPCrack.exe": "100",
    "relaySMTP.exe": "250",
    "HTTPWorm.exe": "500",
    "SQLInject.exe": "750",
    // "AutoLink.exe": "25",
    // "ServerProfiler.exe": "75",
    // "DeepscanV1.exe": "75",
    // "DeepscanV2.exe": "400",
};