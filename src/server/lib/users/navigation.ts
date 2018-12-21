/**
 * users.navigation.ts
 * Handle user routing,
 * selecting all links that the user has access to
*/

// Node Modules
import { EventEmitter } from 'events';

// NPM Modules
import * as uuid from 'uuid'

// Local Modules
import { getPool } from '../connection'
import { UserTypes } from '../../types/users';
import { NavigationSettings } from '../../types/roles';
import { Validation } from '../validation';
import { StatusMessage } from '../../types/server';
import { create } from 'domain';

// Constants and global variables
const pool = getPool()

export class Navigation {
    user?: UserTypes.AuthToken
    links?: Array<NavigationSettings.Links>

    /**
     * Create 
     */
    constructor({userInfo, linkInfo}: {userInfo: UserTypes.AuthToken, linkInfo: Array<NavigationSettings.Links>}) {
        this.user = userInfo
        this.links = linkInfo
    }

    /**
     * Get all links for the requested user
     */
    public getAllLinks() {
        return new Promise(function(resolve, reject) {
            if (this.user && this.user.userRoles) {
                let where: Array<string>
                for (let role in this.user.userRoles) {
                    where.push(`nrRoleId = ${pool.escape(role)}`)
                }
                let sql: string = `
                    SELECT navigationRoles.nrLink,
                           navigation.navId,
                           CONCAT(navigation.navPathName, navigation.navQueryString)
                            AS href
                    FROM navigationRoles
                    WHERE
                    (
                        ${where.join(' OR ')}
                        AND
                        navActive = 1
                    )
                    INNER JOIN navigation
                    ON navigationRoles.nrLink = 
                       navigation.navId
                    GROUP BY navMenu
                `
                pool.query(sql, function(err: Error, links: Array<NavigationSettings.Links>) {
                    pool.end()
                    if (err) {throw err}
                    if (links) {
                        resolve(links)
                    } else {
                        reject({
                            error: true,
                            message: 'No results found'
                        })
                    }
                })
    
            }
        })
    }

    /**
     * Insert the link and validate that it hasn't already been added
     * @param link Link to be added
     */
    private createLink(link: NavigationSettings.Links) {
        return new Promise(function(resolve, reject) {
            if (link.navHref) {
                link.navPathName = link.navHref.split('?')[0]
                link.navQueryString = link.navHref.split('?')[1]
            }
            let validator = new Validation(link)
            let missingFields = validator.required([
                'navInnerText',
                'navPathName',
                'navHeader',
                'navMenu'
            ])
            if (missingFields) {
                reject({
                    error: true,
                    message: 'Missing required fields',
                    details: missingFields
                })
            }
            let navLinkToBeEntered: NavigationSettings.Links 
                = validator.defaults({
                    navId: uuid.v4(),
                    navQueryString: null,
                    navActive: true,
                    navRole: null
                })
           
            let sql = `
                INSERT INTO navigation
                    navId,
                    navInnerText,
                    navPathName,
                    navQueryString,
                    navHeader,
                    navMenu,
                    navActive,
                    navRole
                VALUES (
                    ${pool.escape([
                        navLinkToBeEntered.navId,
                        navLinkToBeEntered.navInnerText,
                        navLinkToBeEntered.navPathName,
                        navLinkToBeEntered.navQueryString,
                        navLinkToBeEntered.navHeader,
                        navLinkToBeEntered.navMenu,
                        navLinkToBeEntered.navActive,
                        navLinkToBeEntered.navRole
                    ])}
                )
            `
            pool.query(sql, function(err: Error, results) {
                if (err) {throw {
                    error: true,
                    message: err,
                    details: navLinkToBeEntered
                }}
                resolve({
                    error: false,
                    message: 'Added link',
                    details: navLinkToBeEntered
                })
            })
        })
    }

    /**
     * Add new navigation links
     */
    public addLinks(): Promise<StatusMessage> {
        return new Promise(function(resolve, reject) {
            if (this.links && this.links.length > 0) {
                let navLinksEntered: Array<NavigationSettings.Links>
                let navLinksIgnored: Array<NavigationSettings.Links>

                this.links.forEach(link => {
                    this.createLink(link)
                    .then((onSuccessMessage: StatusMessage) => {
                        navLinksEntered.push(onSuccessMessage.details)
                    }, (onFailureMessage: StatusMessage) => {
                        navLinksIgnored.push(onFailureMessage.details)
                    })
                    .catch((error: StatusMessage) => {
                        navLinksIgnored.push(error.details)
                    })
                });
                resolve({
                    error: false,
                    message: 'Completed adding links',
                    details: {navLinksEntered, navLinksIgnored}
                })
            }
        })
    }
}