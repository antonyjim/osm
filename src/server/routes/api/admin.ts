/**
 * routes.api.admin.ts
 * Provide routes for administrative duties
*/

// Node Modules


// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import { NavigationSettings } from '../../types/roles';
import { Navigation } from '../../lib/users/navigation';
import { StatusMessage } from '../../types/server';
import { Roles } from '../../lib/users/roles';
import { Querynator } from '../../lib/connection';


// Constants and global variables
const adminRoutes = Router()

adminRoutes.get('/getRoles', function(req: Request, res: Response){
    new Roles().get()
    .then((roles) => {
        res.status(200).json(roles)
    })
    .catch((err) => {
        console.error(err)
        res.status(200).json(err)
    })
})

adminRoutes.get('/getPrivs', function(req: Request, res: Response){
    new Roles().getPrivs(req.query.role)
    .then((privs) => {
        res.status(200).json(privs)
    })
    .catch((err) => {
        res.status(200).json(err)
    })
})

adminRoutes.get('/getRoute', function(req: Request, res: Response){
    let route = req.query.route || req.body.route
    if (!route) {
        res.status(200).json({
            error: true,
            message: 'No route provided'
        })
    } else {
        new Navigation({linkInfo: [route]}).getLink()
        .then((onLinkSearched: StatusMessage) => {
            res.status(200).json(onLinkSearched)
        }, (onLinkSearchFailure: StatusMessage) => {
            res.status(200).json(onLinkSearchFailure)
        })
        .catch((err: StatusMessage) => {
            res.status(200).json(err)
        })
    }
})

adminRoutes.get('/getAllRoutes', function(req: Request, res: Response){
        new Navigation({}).getAllLinks()
        .then((onSuccess) => {
            res.status(200).json(onSuccess)
        }, (onFailure) => {
            res.status(200).json(onFailure)
        })
        .catch((err) => {
            console.log(JSON.stringify(err))
            res.status(500).json(err)
        })
})

adminRoutes.post('/addRoute', function(req: Request, res: Response){
    if (<Array<NavigationSettings.Links>>req.body && req.body.length > 0) {
        new Navigation({linkInfo: req.body}).addLinks()
        .then((onLinksAdded: StatusMessage) => {
            res.status(200).json(onLinksAdded)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(200).json({
            error: true,
            message: 'No valid data provided'
        })
    }
}) 

adminRoutes.post('/updateRoute', function(req: Request, res: Response){
    if(req.body) {
        new Navigation({linkInfo: [req.body]}).updateLink()
        .then((onLinkUpdated: StatusMessage) => {
            res.status(200).json(onLinkUpdated)
        }, (onLinkNotUpdated: StatusMessage) => {
            res.status(200).json(onLinkNotUpdated)
        })
        .catch((err: Error) => {
            res.status(200).json(err)
        })
    } else {
        res.status(200).json({
            error: true,
            message: 'No link provided, or provided in wrong format',
            details: req.body
        })
    }
})

adminRoutes.post('/roles/:action', function(req: Request, res: Response) {
    const rpId = req.query.rpId
    const rpPriv = req.query.rpPriv
    const action = req.params.action
    if (action === 'remove' || action === 'add') {
        new Roles({rpId, rpPriv}).update(action)
        .then((onChanged: StatusMessage) => {
            res.status(200).json(onChanged)
        }, (onNotChanged: StatusMessage) => {
            res.status(200).json(onNotChanged)
        })
        .catch((err: Error) => {
            console.error(err)
            res.status(500).send()
        })
    } else {
        res.status(200).json({
            error: true,
            message: 'Invalid action supplied. Please use \'remove\' or \'update\' to modify a role or privilege'

        })
    }
})

adminRoutes.post('/sql', (req: Request, res: Response) => {
    new Querynator({req, res}).createQ({
        query: req.body.query
    }, 'CALL')
    .then(results => {
        res.status(200).json(results)
    })
    .catch(e => {
        res.status(500).json({message: e.message})
    })
}) 

export { adminRoutes }