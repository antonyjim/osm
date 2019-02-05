import NSACL from './nsacl'

export const nsaclQueries = {
    sys_user_nsacl_list: ((queryFields, fields, context, pagination) => new NSACL(context, queryFields).where(fields, pagination))
}

export default nsaclQueries