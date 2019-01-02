/**
 * emails.ts
 * Send out a canned email to requested user or receipient
*/

// Node Modules


// NPM Modules
import { createTransport, Transporter } from 'nodemailer'
import { transporterSettings } from '../connection';

// Local Modules
import { StatusMessage } from './../../types/server'


// Constants and global variables
const transporter: Transporter = createTransport(transporterSettings)

function sendConfirmation({userEmail, confirmationToken}) {
    return new Promise(function(resolve, reject) {
        if (!userEmail || !confirmationToken) {
            reject({
                error: true,
                message: 'Missing email or token'
            })
        }
        let message = {
            from: 'Tire-HQ Signer <tirehq.helpdesk@goodyear.com>',
            to: userEmail,
            subject: 'Confirm Email',
            html: `<a href="https://www.tire-hq.com/verifyToken/?token=${confirmationToken}">Click here to verify </a>`
        }
        transporter.sendMail(message, function(err: Error, info) {
            if (err) {throw err}
            let status: StatusMessage = {
                error: false,
                message: 'Email sent',
                details: userEmail
            }
            resolve(status)
        })
    
    })
}

export { sendConfirmation }

