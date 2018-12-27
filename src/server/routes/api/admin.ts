/**
 * routes.api.admin.ts
 * Provide routes for administrative duties
*/

// Node Modules


// NPM Modules
import { Router } from 'express'

// Local Modules
import { NavigationSettings } from '../../types/roles';
import { Navigation } from '../../lib/users/navigation';
import { StatusMessage } from '../../types/server';
import { Roles } from '../../lib/users/roles';


// Constants and global variables
const adminRoutes = Router()

adminRoutes.get('/getRoles', function(req, res) {
    new Roles().get()
    .then((roles) => {
        res.status(200).json(roles)
    })
    .catch((err) => {
        res.status(200).json(err)
    })
})

adminRoutes.get('/getPrivs', function(req, res) {
    new Roles().getPrivs()
    .then((privs) => {
        res.status(200).json(privs)
    })
    .catch((err) => {
        res.status(200).json(err)
    })
})

adminRoutes.get('/getRoute', function(req, res) {
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

adminRoutes.get('/getAllRoutes', function(req, res) {
        new Navigation({}).getAllLinks() 
})

adminRoutes.post('/addRoute', function(req, res) {
    if (<Array<NavigationSettings.Links>>req.body && req.body.length > 0) {
        new Navigation({linkInfo: req.body}).addLinks()
        .then((onLinksAdded: StatusMessage) => {
            res.status(200).json(onLinksAdded)
        })
        .catch(err => {
            console.error(JSON.stringify(err))
            res.status(500).json(err)
        })
    } else {
        res.status(200).json({
            error: true,
            message: 'No valid data provided'
        })
    }
}) 

adminRoutes.post('/updateLink', function(req, res) {
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

adminRoutes.post('/roles/add', function(req, res) {
    let role = req.body.role
    if (role) {
        new Roles(role).add
    } else {
        res.status(200).json({
            error: true,
            message: 'No role provided'
        })
    }
})

export { adminRoutes }