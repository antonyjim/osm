
import userQueries from './../users/queries'
import customerQueries from "../customers/queries";
import tableQueries from "../tables/queries";
import nsaclQueries from '../nsacl/queries';

const rootQueries = {
        sys_user_list: userQueries.user_list,
        sys_user: userQueries.user,
        sys_customer_list: customerQueries.customer_list,
        sys_customer: customerQueries.customer,
        table_list: tableQueries.table_list,
        table: tableQueries.table,
        sys_user_nsacl_list: nsaclQueries.sys_user_nsacl_list
}

export { rootQueries }
