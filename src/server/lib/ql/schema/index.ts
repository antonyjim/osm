import APICall from "./API";

/**
 * lib/ql/index.ts
 * Provide the single export for the API
*/

// Node Modules


// NPM Modules


// Local Modules


// Constants and global variables


export default function API() {
    return function API(req, res, next) {
        new APICall({req, res, next})
    }
}