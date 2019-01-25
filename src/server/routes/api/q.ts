/**
 * q.ts
 * Prove routes for the api table query
*/

// Node Modules

// NPM Modules
import { Router, Request, Response } from 'express'
const grapqlHTTP = require('./../../lib/ql/express-graphql')

// Local Modules
import { queryTable } from '../../lib/query';
import { StatusMessage } from '../../types/server';
import { qlSchema } from '../../lib/ql/q';


// Constants and global variables
const q = Router()

/*
q.get('/:table', (req, res) => {
    queryTable(req.params.table, req.query)
    .then((onSuccess: StatusMessage) => {
        res.status(200).json(onSuccess)
    }, (onFailure: StatusMessage) => {
        res.status(200).json(onFailure)
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({
            error: true,
            message: 'Unexpected error occurred'
        })
    })
})
*/

q.get('/', grapqlHTTP({
    schema: qlSchema,
    graphiql: true
}))

q.post('/', grapqlHTTP({
    schema: qlSchema,
    graphiql: true
}))

export { q }