/**
 * @param {import(".").NS } ns
 * @param {string} baseUrl
 * @param {string[]} files
 */
export async function downloadAllFiles(ns, baseUrl, files) {
    for (let i = 0 ; i < files.length ; i++) {
        let fileName = files[i];
        ns.rm(fileName);
        await ns.wget(baseUrl + fileName, fileName);
    }
}
