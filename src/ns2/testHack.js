import ServerDetails from "ServerDetails.js";

const TARGET_SERVER = "n00dles";
const BASE_DELAY_MS = 10;

/** @param {import(".").NS } ns */
export async function main(ns) {
    let serverDetails = new ServerDetails(ns, TARGET_SERVER);

    let weakenTime = serverDetails.weakenTime;
    let growTime = serverDetails.growTime;
    let hackTime = serverDetails.hackTime;
    let growThreads = Math.ceil(serverDetails.growThreadsToReachMaxMoney);

    ns.tprint("weakenTime: " + weakenTime);
    ns.tprint("growTime: " + growTime);
    ns.tprint("hackTime: " + hackTime);

    let startTime = new Date();
    ns.tprint("Current Time: " + startTime.toISOString())
    ns.tprint("-------------------------------------");

    let weakenStartTime = new Date();
    let weakenEndTime = new Date();
    weakenStartTime.setTime(weakenStartTime.getTime() + BASE_DELAY_MS);
    weakenEndTime.setTime(weakenStartTime.getTime() + weakenTime);
    ns.tprint("Start weaken: " + weakenStartTime.toISOString());

    let growStartTime = new Date();
    let growEndTime = new Date();
    growStartTime.setTime(weakenStartTime.getTime() + (weakenTime - growTime) - BASE_DELAY_MS);
    growEndTime.setTime(growStartTime.getTime() + growTime);
    ns.tprint("Start Grow:   " + growStartTime.toISOString());

    let hackStartTime = new Date();
    let hackEndTime = new Date();
    hackStartTime.setTime( weakenStartTime.getTime() + weakenTime + BASE_DELAY_MS - hackTime );
    hackEndTime.setTime(hackStartTime.getTime() + hackTime);
    ns.tprint("Start Hack:   " + hackStartTime.toISOString());

    ns.tprint("End Grow:     " + growEndTime.toISOString());
    ns.tprint("End Weaken:   " + weakenEndTime.toISOString());
    ns.tprint("End Hack:     " + hackEndTime.toISOString());

    ns.tprint("Required growThreads: " + growThreads);


    //serverDetails.testing();

}