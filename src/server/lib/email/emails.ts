/**
 * emails.ts
 * Send out a canned email to requested user or receipient
*/

// Node Modules


// NPM Modules
import { createTransport, Transporter } from 'nodemailer'
import { sign } from 'jsonwebtoken';

// Local Modules
import { StatusMessage } from './../../types/server'
import { transporterSettings, jwtSecret } from '../connection';

// Constants and global variables
const transporter: Transporter = createTransport(transporterSettings)

function sendConfirmation({userEmail, confirmationToken, action}, cb?) {
      if (!userEmail || !confirmationToken && cb) {
          cb(new Error('Missing email or token'))
      }
      const token = sign({
          t: confirmationToken,
          action
      },
      jwtSecret,
      {
          expiresIn: '48h'
      })
      let message = {
          from: 'Tire-HQ Signer <tirehq.helpdesk@goodyear.com>',
          to: userEmail,
          subject: 'Confirm Email',
          html: `<a href="http://localhost:8085/verifyToken/?token=${token}">Click here to verify </a>`
      }
      transporter.sendMail(message, function(err: Error, info) {
          if (err) cb(err)
          let status: StatusMessage = {
              error: false,
              message: 'Email sent',
              details: userEmail
          }
          if (cb) {
            cb(null, status)
          }
      })
}

function sendFailedPasswordReset(userEmail: string) {
    if (!userEmail) {
        return 1
    }
    let message = {
        from: 'Tire-HQ Support <tirehq.helpdesk@goodyear.com>',
        to: userEmail,
        subject: 'Tire-HQ Password',
        html: `
        <!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Simple Transactional Email</title>
            <style>
              /* -------------------------------------
                  GLOBAL RESETS
              ------------------------------------- */
              
              /*All the styling goes here*/
              
              img {
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; 
              }
              body {
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%; 
              }
              table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%; }
                table td {
                  font-family: sans-serif;
                  font-size: 14px;
                  vertical-align: top; 
              }
              /* -------------------------------------
                  BODY & CONTAINER
              ------------------------------------- */
              .body {
                background-color: #f6f6f6;
                width: 100%; 
              }
              /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
              .container {
                display: block;
                margin: 0 auto !important;
                /* makes it centered */
                max-width: 580px;
                padding: 10px;
                width: 580px; 
              }
              /* This should also be a block element, so that it will fill 100% of the .container */
              .content {
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px; 
              }
              /* -------------------------------------
                  HEADER, FOOTER, MAIN
              ------------------------------------- */
              .main {
                background: #ffffff;
                border-radius: 3px;
                width: 100%; 
              }
              .wrapper {
                box-sizing: border-box;
                padding: 20px; 
              }
              .content-block {
                padding-bottom: 10px;
                padding-top: 10px;
              }
              .footer {
                clear: both;
                margin-top: 10px;
                text-align: center;
                width: 100%; 
              }
                .footer td,
                .footer p,
                .footer span,
                .footer a {
                  color: #999999;
                  font-size: 12px;
                  text-align: center; 
              }
              /* -------------------------------------
                  TYPOGRAPHY
              ------------------------------------- */
              h1,
              h2,
              h3,
              h4 {
                color: #000000;
                font-family: sans-serif;
                font-weight: 400;
                line-height: 1.4;
                margin: 0;
                margin-bottom: 30px; 
              }
              h1 {
                font-size: 35px;
                font-weight: 300;
                text-align: center;
                text-transform: capitalize; 
              }
              p,
              ul,
              ol {
                font-family: sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                margin-bottom: 15px; 
              }
                p li,
                ul li,
                ol li {
                  list-style-position: inside;
                  margin-left: 5px; 
              }
              a {
                color: #3498db;
                text-decoration: underline; 
              }
              /* -------------------------------------
                  BUTTONS
              ------------------------------------- */
              .btn {
                box-sizing: border-box;
                width: 100%; }
                .btn > tbody > tr > td {
                  padding-bottom: 15px; }
                .btn table {
                  width: auto; 
              }
                .btn table td {
                  background-color: #ffffff;
                  border-radius: 5px;
                  text-align: center; 
              }
                .btn a {
                  background-color: #ffffff;
                  border: solid 1px #3498db;
                  border-radius: 5px;
                  box-sizing: border-box;
                  color: #3498db;
                  cursor: pointer;
                  display: inline-block;
                  font-size: 14px;
                  font-weight: bold;
                  margin: 0;
                  padding: 12px 25px;
                  text-decoration: none;
                  text-transform: capitalize; 
              }
              .btn-primary table td {
                background-color: #3498db; 
              }
              .btn-primary a {
                background-color: #3498db;
                border-color: #3498db;
                color: #ffffff; 
              }
              /* -------------------------------------
                  OTHER STYLES THAT MIGHT BE USEFUL
              ------------------------------------- */
              .last {
                margin-bottom: 0; 
              }
              .first {
                margin-top: 0; 
              }
              .align-center {
                text-align: center; 
              }
              .align-right {
                text-align: right; 
              }
              .align-left {
                text-align: left; 
              }
              .clear {
                clear: both; 
              }
              .mt0 {
                margin-top: 0; 
              }
              .mb0 {
                margin-bottom: 0; 
              }
              .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0; 
              }
              .powered-by a {
                text-decoration: none; 
              }
              hr {
                border: 0;
                border-bottom: 1px solid #f6f6f6;
                margin: 20px 0; 
              }
              /* -------------------------------------
                  RESPONSIVE AND MOBILE FRIENDLY STYLES
              ------------------------------------- */
              @media only screen and (max-width: 620px) {
                table[class=body] h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important; 
                }
                table[class=body] p,
                table[class=body] ul,
                table[class=body] ol,
                table[class=body] td,
                table[class=body] span,
                table[class=body] a {
                  font-size: 16px !important; 
                }
                table[class=body] .wrapper,
                table[class=body] .article {
                  padding: 10px !important; 
                }
                table[class=body] .content {
                  padding: 0 !important; 
                }
                table[class=body] .container {
                  padding: 0 !important;
                  width: 100% !important; 
                }
                table[class=body] .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important; 
                }
                table[class=body] .btn table {
                  width: 100% !important; 
                }
                table[class=body] .btn a {
                  width: 100% !important; 
                }
                table[class=body] .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important; 
                }
              }
              /* -------------------------------------
                  PRESERVE THESE STYLES IN THE HEAD
              ------------------------------------- */
              @media all {
                .ExternalClass {
                  width: 100%; 
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                  line-height: 100%; 
                }
                .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important; 
                }
                .btn-primary table td:hover {
                  background-color: #34495e !important; 
                }
                .btn-primary a:hover {
                  background-color: #34495e !important;
                  border-color: #34495e !important; 
                } 
              }
            </style>
          </head>
          <body class="">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="content">
        
                    <!-- START CENTERED WHITE CONTAINER -->
                    <span class="preheader">Reset password</span>
                    <table role="presentation" class="main">
        
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <p>Hi there,</p>
                                <p>You (or somebody else) requested a entered this email address when trying to reset the password for a Tire-HQ account. </p>
                                <p>Unfortunately this email is not registered to any of our users. If you are a Tire-HQ customer, please try again
                                using the email address provided when you initially registered for the service.</p>
                                <p> If you are not a Tire-HQ customer, please ignore this email.</p>
                                <p> For any further questions, please contact the Tire-HQ Helpdesk at 800-331-4541 Opt 1. </p>
                                <p> Regards, </p>
                                <p><h5> Tire-HQ Support </h5></p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    <!-- END MAIN CONTENT AREA -->
                    </table>
        
                    <!-- START FOOTER -->
                    <div class="footer">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <span class="apple-link">Goodyear Tire And Rubber Company</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- END FOOTER -->
        
                  <!-- END CENTERED WHITE CONTAINER -->
                  </div>
                </td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>`
    }
    transporter.sendMail(message, function(err: Error, info) {
        if (err) console.error(err)
    })
}

function sendPasswordReset(userEmail: string, token: string) {
    if (!userEmail || !token) {
        return 1
    }
    let message = {
        from: 'Tire-HQ Support <tirehq.helpdesk@goodyear.com>',
        to: userEmail,
        subject: 'Password reset',
        html: `<a href="http://localhost:8085/verifyToken/?token=${token}">Click here to verify </a>`
    }
    transporter.sendMail(message, function(err: Error, info) {
        if (err) console.error(err)
    })
}

export { sendConfirmation, sendFailedPasswordReset, sendPasswordReset }

