import API from '@lib/API'

interface IRawDomainList {
  createdAt: Date
  domain: string
  domainId: number
  expirationProtected: boolean
  expires: Date
  holdRegistrar: boolean
  locked: boolean
  nameServers: string[]
  privacy: boolean
  renewAuto: boolean
  renewDeadline: Date
  renewable: boolean
  status: 'ACTIVE' | 'CANCELLED'
  transferProtected: boolean
}
;[]

interface IRawDomainRecord {
  data: string
  name: string
  ttl: number
  type: string
}

export function getDomainList(): Promise<IRawDomainList> {
  return new Promise(
    (
      resolveDomainList: (results: IRawDomainList) => void,
      rejectDomainList: (err: Error) => void
    ) => {
      API.get({
        path: '/api/ds/domains'
      })
        .then((domains: { body: IRawDomainList }) => {
          resolveDomainList(domains.body)
        })
        .catch(rejectDomainList)
    }
  )
}

export function getDomainRecords(domain: string): Promise<IRawDomainRecord[]> {
  return new Promise(
    (
      resolveDomainRecords: (results: IRawDomainRecord[]) => void,
      rejectDomainRecords: (err: Error) => void
    ) => {
      API.get({
        path: '/api/ds/domain/' + domain
      })
        .then((records: { body: IRawDomainRecord[] }) => {
          resolveDomainRecords(records.body)
        })
        .catch(rejectDomainRecords)
    }
  )
}

export function updateDomainRecord(
  domain: string,
  record: IRawDomainRecord
): Promise<boolean> {
  return new Promise(
    (
      resolveUpdatedRecord: (results: boolean) => void,
      rejectUpdatedRecord: (err: Error) => void
    ) => {
      API.put<{ success: boolean }>({
        path:
          '/api/ds/domain/' +
          domain +
          '/records/' +
          record.type +
          '/' +
          record.name,
        body: [record]
      })
        .then((res: { success: boolean }) => {
          resolveUpdatedRecord(res.success)
        })
        .catch(rejectUpdatedRecord)
    }
  )
}
