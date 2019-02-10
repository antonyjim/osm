/**
 * lib/table.config.ts
 * Store a list of table names so that if the table name
 * changes, queries will not break. 
*/

const schema = {
    sys_user: 'sys_user',
    sys_user_nsacl: 'sys_user_nsacl',
    sys_navigation_list: 'uiNavigation',
    sys_role: 'sys_role'
}

export default schema