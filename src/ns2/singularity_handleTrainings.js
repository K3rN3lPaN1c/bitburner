import * as CONSTANTS from "lib_constants.js";
import {travelIfNeeded} from "lib_singularity_travelIfNeeded.js";



/** @param {import(".").NS } ns */
export async function main(ns) {
    if (CONSTANTS.SINGULARITY_WORK_TYPES_NOT_TO_INTERRUPT.includes(ns.getPlayer().workType)) {
        return;
    }

    let p = ns.getPlayer();
    let nextFaction = ns.args[0];

    let targetHackingLevel = CONSTANTS.SINGULARITY_TRAINING_BASE_STAT * p.hacking_exp_mult * p.hacking_mult;
    let targetStrLevel = Math.max(CONSTANTS.SINGULARITY_TRAINING_BASE_STAT * p.strength_exp_mult * p.strength_mult, CONSTANTS.SINGULARITY_TRAINING_HARD_THRESHOLD);
    let targetDefLevel = Math.max(CONSTANTS.SINGULARITY_TRAINING_BASE_STAT * p.defense_exp_mult * p.defense_mult, CONSTANTS.SINGULARITY_TRAINING_HARD_THRESHOLD);
    let targetDexLevel = Math.max(CONSTANTS.SINGULARITY_TRAINING_BASE_STAT * p.dexterity_exp_mult * p.dexterity_mult, CONSTANTS.SINGULARITY_TRAINING_HARD_THRESHOLD);
    let targetAgiLevel = Math.max(CONSTANTS.SINGULARITY_TRAINING_BASE_STAT * p.agility_exp_mult * p.agility_mult, CONSTANTS.SINGULARITY_TRAINING_HARD_THRESHOLD);
    let targetChaLevel = CONSTANTS.SINGULARITY_TRAINING_BASE_STAT * p.charisma_exp_mult * p.charisma_mult;

    if (nextFaction && nextFaction in CONSTANTS.FACTIONS_BATTLE_STAT_REQUIREMENTS) {
        let battleStatRequirement = CONSTANTS.FACTIONS_BATTLE_STAT_REQUIREMENTS[nextFaction];
        targetStrLevel = Math.max(targetStrLevel, battleStatRequirement);
        targetDefLevel = Math.max(targetDefLevel, battleStatRequirement);
        targetDexLevel = Math.max(targetDexLevel, battleStatRequirement);
        targetAgiLevel = Math.max(targetAgiLevel, battleStatRequirement);
    }

    if (p.hacking < targetHackingLevel) {
        travelIfNeeded(ns, CONSTANTS.CITY_SECTOR_12);
        ns.toast("Training hack until: " + targetHackingLevel, "info");
        //todo: check taking algo course
        ns.universityCourse(CONSTANTS.LOCATION_ROTHMAN_UNIVERSITY, CONSTANTS.COURSE_ALGORITHMS);
    } else if (p.strength < targetStrLevel) {
        travelIfNeeded(ns, CONSTANTS.CITY_SECTOR_12);
        ns.toast("Training str until: " + targetStrLevel, "info");
        if (ns.getPlayer().workType !== "Studying or Taking a class at university" || ns.getPlayer().className !== "training your strength at a gym") {
            ns.gymWorkout(CONSTANTS.LOCATION_POWERHOUSE_GYM, CONSTANTS.WORKOUT_STRENGTH);
        }
    } else if (p.defense < targetDefLevel || p.defense < CONSTANTS.SINGULARITY_TRAINING_HARD_THRESHOLD) {
        travelIfNeeded(ns, CONSTANTS.CITY_SECTOR_12);
        ns.toast("Training def until: " + targetDefLevel, "info");
        if (ns.getPlayer().workType !== "Studying or Taking a class at university" || ns.getPlayer().className !== "training your defense at a gym") {
            ns.gymWorkout(CONSTANTS.LOCATION_POWERHOUSE_GYM, CONSTANTS.WORKOUT_DEFENSE);
        }
    } else if (p.dexterity < targetDexLevel || p.dexterity < CONSTANTS.SINGULARITY_TRAINING_HARD_THRESHOLD) {
        travelIfNeeded(ns, CONSTANTS.CITY_SECTOR_12);
        ns.toast("Training dex until: " + targetDexLevel, "info");
        if (ns.getPlayer().workType !== "Studying or Taking a class at university" || ns.getPlayer().className !== "training your dexterity at a gym") {
            ns.gymWorkout(CONSTANTS.LOCATION_POWERHOUSE_GYM, CONSTANTS.WORKOUT_DEXTERITY);
        }
    } else if (p.agility < targetAgiLevel || p.agility < CONSTANTS.SINGULARITY_TRAINING_HARD_THRESHOLD) {
        travelIfNeeded(ns, CONSTANTS.CITY_SECTOR_12);
        ns.toast("Training agi until: " + targetAgiLevel, "info");
        if (ns.getPlayer().workType !== "Studying or Taking a class at university" || ns.getPlayer().className !== "training your agility at a gym") {
            ns.gymWorkout(CONSTANTS.LOCATION_POWERHOUSE_GYM, CONSTANTS.WORKOUT_AGILITY);
        }
    } else if (p.charisma < targetChaLevel) {
        travelIfNeeded(ns, CONSTANTS.CITY_SECTOR_12);
        ns.toast("Training cha until: " + targetChaLevel, "info");
        //todo: check taking leadership course
        ns.universityCourse(CONSTANTS.LOCATION_ROTHMAN_UNIVERSITY, CONSTANTS.COURSE_LEADERSHIP);
    } else if (ns.getPlayer().className !== undefined && ns.getPlayer().className !== "") {
        ns.stopAction();
    }
}