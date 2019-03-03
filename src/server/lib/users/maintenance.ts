/**
 * users.maintenance.ts
 * Provide utilities for creating and modifying user accounts and nonsigs
 */

// Node Modules

// NPM Modules
import * as uuid from 'uuid'

// Local Modules
import { Validation } from '../validation'
import { IStatusMessage } from '../../types/server'
import { getPool, simpleQuery } from '../connection'
import {
  sendConfirmation,
  sendFailedPasswordReset,
  sendPasswordReset
} from '../email/emails'
import { NonsigTypes } from '../../types/nonsig'

// Constants and global variables
const pool = getPool()
const saltRounds = 10

export class Nonsig {
  private customer: NonsigTypes.ICustomerInfo

  /**
   * @param ns Nonsig information
   */
  constructor(ns) {
    this.customer = ns
    this.normalizeNonsig()
  }

  private normalizeNonsig() {
    let nonsig = this.customer.nonsig
    if (nonsig && nonsig.length < 9) {
      while (nonsig.length < 9) nonsig = '0' + nonsig
      this.customer.nonsig = nonsig
      return 0
    } else if (nonsig && nonsig.length > 9) {
      this.customer.nonsig = nonsig.slice(0, 9)
      return 0
    } else if (nonsig && nonsig.length === 9) {
      return 0
    } else {
      throw new TypeError('No customer number provided')
    }
  }

  private async checkForExistingNonsig(nsNonsig) {
    const customerInfo = await this.getByCustomerNumber(nsNonsig).catch(
      (err) => {
        throw err
      }
    )

    if (customerInfo.length > 0) {
      return {
        error: true,
        message: 'Nonsig already exists',
        details: customerInfo
      }
    } else {
      return {
        error: false,
        message: 'Nonsig does not exist'
      }
    }
  }

  public async getByCustomerNumber(customerNumber: string): Promise<any> {
    const query: string =
      'SELECT ??, ??, ??, ?? FROM ?? WHERE LPAD(??, 9, 0) = ?'
    const params: string[] = [
      'sys_id',
      'nonsig',
      'active',
      'active_thq',
      'sys_customer',
      customerNumber
    ]
    return await simpleQuery(query, params).catch((err) => console.error(err))
  }

  public create() {
    return new Promise((resolve, reject) => {
      const validator = new Validation(this.customer)
      const invalidFields = validator.defaults([
        'nsTradeStyle',
        'nsNonsig',
        'nsAddr1',
        'nsCity',
        'nsPostalCode',
        'nsCountry',
        'nsType'
      ])
      if (invalidFields) {
        reject(invalidFields)
      } else {
        this.checkForExistingNonsig(this.customer.nonsig)
          .then(
            (onSuccess: IStatusMessage) => {
              const nsToAdd = validator.defaults({
                nsId: uuid.v4(),
                nsIsActive: true,
                nsIsActiveTHQ: true,
                nsAddr2: null,
                nsBrandKey: null
              })
              const insertionSql = `
                        INSERT INTO
                            sys_customer (
                                nsId,
                                nsTradeStyle,
                                nsNonsig,
                                nsAddr1,
                                nsAddr2,
                                nsCity,
                                nsState,
                                nsPostalCode,
                                nsCountry,
                                nsBrandKey,
                                nsIsActive,
                                nsIsActiveTHQ,
                                nsType
                            )
                        VALUES (
                            ${pool.escape([
                              nsToAdd.nsId,
                              nsToAdd.nsTradeStyle,
                              nsToAdd.nsNonsig,
                              nsToAdd.nsAddr1,
                              nsToAdd.nsAddr2,
                              nsToAdd.nsCity,
                              nsToAdd.nsState,
                              nsToAdd.nsPostalCode,
                              nsToAdd.nsCountry,
                              nsToAdd.nsBrandKey,
                              nsToAdd.nsIsActive,
                              nsToAdd.nsIsActiveTHQ,
                              nsToAdd.nsType
                            ])}
                        )
                    `
              pool.query(insertionSql, (err: Error, results) => {
                if (err) {
                  throw {
                    error: true,
                    message: err
                  }
                } else {
                  resolve({
                    error: false,
                    message: 'Added nonsig',
                    details: nsToAdd
                  })
                }
              })
            },
            (onFailure: IStatusMessage) => {
              reject(onFailure)
            }
          )
          .catch((err: IStatusMessage) => {
            reject(err)
          })
      }
    })
  }

  public existsAndIsActive(): Promise<{
    error: boolean
    isActiveTHQ: boolean
    isActive: boolean
  }> {
    return new Promise((resolve, reject) => {
      const sql = `
                SELECT nsNonsig, nsIsActive, nsIsActiveTHQ
                FROM sys_customer
                WHERE nsNonsig = ${pool.escape(this.customer.nonsig)}
            `
      pool.query(sql, (err: Error, results: NonsigTypes.ICustomerInfo[]) => {
        if (err) {
          throw err
        } else {
          if (results.length === 1) {
            const nonsig = results[0]
            resolve({
              error: false,
              isActiveTHQ: nonsig.active_thq,
              isActive: nonsig.active
            })
          } else {
            reject({
              error: true,
              message: 'No nonsig found'
            })
          }
        }
      })
    })
  }
} // Nonsig
