
/**
 * lib/ql/index.ts
 * Provide the single export for the API
*/

// Node Modules


// NPM Modules
import { Request, Response } from "express";

// Local Modules
import APICall from "./API";


// Constants and global variables

export default function API() {
    return function API(req: Request, res: Response) {
        switch(req.method) {
            case 'PUT' : {
                new APICall({req, res}).create()
            }
            case 'GET' : {
                new APICall({req, res}).query()
            }
        }

    }
}