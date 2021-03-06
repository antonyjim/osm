
DROP DATABASE IF EXISTS {{database}};

CREATE DATABASE {{database}};
USE {{database}};

/* Store some default sys_id here */
SET @sys_app_scope_sys_id = '74d5c12ea-51e4-68fa-28cefaa9fe5cb53';
SET @root_sys_ou_sys_id = '0ccaa259-b60b-443a-bc91-cb49abc88b86';
SET @root_sys_org_sys_id = '6d7b5144-9060-42d2-aa20-f99294194382';
SET @default_admin_sys_id = 'b42a1170-096a-11e9-b568-0800200c9a66';
SET @default_admin_group_sys_id = 'a3410430-ed58-49e5-8be8baef0ad19e35';
SET @default_admin_role_sys_id = 'd6692dc1-9d32-4894-badf95820d09431b';
SET @default_admin_email = 'antonyjund@gmail.com';

/* Source all files */

SOURCE {{dirname}}/schema/core_tables.sql;
SOURCE {{dirname}}/schema/user_tables.sql;
SOURCE {{dirname}}/schema/db_tables.sql;
SOURCE {{dirname}}/schema/content_tables.sql;
SOURCE {{dirname}}/schema/form_tables.sql;
SOURCE {{dirname}}/schema/log_tables.sql;

/* Source triggers */
SOURCE {{dirname}}/triggers/ins_sys_user.sql;
SOURCE {{dirname}}/triggers/upd_sys_user.sql;

/* Source procedures and functions */
SOURCE {{dirname}}/proc/fetch_navigation.sql;
SOURCE {{dirname}}/proc/fetch_user_role.sql;
SOURCE {{dirname}}/proc/fetch_user_table_permissions.sql;
SOURCE {{dirname}}/proc/login_email.sql;
SOURCE {{dirname}}/proc/set_user_confirmation.sql;
SOURCE {{dirname}}/proc/login_username.sql;

/* Insert some default data */

INSERT INTO sys_app_scope VALUES (@sys_app_scope_sys_id, 'Global Application', 'SYS', 1);

-- Set up the root organization for global application
INSERT INTO sys_organization VALUES (
    @root_sys_org_sys_id,
    'Company',
    @root_sys_org_sys_id,
    'global',
    'SYS',
    'Root organization level for all applications.'
);


-- Insert the global root unit
INSERT INTO sys_organization_unit VALUES (
    @root_sys_ou_sys_id,
    @root_sys_org_sys_id,
    'Global root organization node',
    'globalroot'
);


/* Create the admin group */
INSERT INTO sys_group (
    sys_id,
    app_scope,
    name,
    type
) VALUES (
    @default_admin_group_sys_id,
    'SYS',
    'Admin',
    'usergroup'
);

INSERT INTO sys_user (sys_id, username, given_name, surname, email, app_scope, pass_hash, is_confirmed, is_active) VALUES (
    @default_admin_sys_id, -- sys_id
    'administrator', -- username
    'Admin', -- given_name
    'Global', -- surname
    @default_admin_email, -- email
    'SYS', -- app_scope
    '$2a$10$r.Nlitz0cVeWeuVa4Lf/Sugw/LZlwBPEZGSqYU52KRz1Be73Dgwsi', -- G00dAdmin
    1, -- is_confirmed
    1 -- is_active
);

INSERT INTO sys_group_membership (group_id, user_id) VALUES (
    @default_admin_group_sys_id,
    @default_admin_sys_id
);

INSERT INTO sys_user_org (user_id, org_unit) VALUES (
    @default_admin_sys_id,
    @root_sys_ou_sys_id
);

INSERT INTO sys_role VALUES (
    @default_admin_role_sys_id,
    NULL,
    'Administrator',
    'SYS',
    1
);

INSERT INTO sys_group_role (group_id, role_id) VALUES (
    @default_admin_group_sys_id,
    @default_admin_role_sys_id
);

INSERT INTO sys_user_role (user_id, role_id) VALUES (
    @default_admin_sys_id,
    @default_admin_role_sys_id
);

INSERT INTO sys_navigation (sys_id, inner_text, path_name, header, menu, role_required) VALUES (
    'f334d193-8906-4402-a073-d238ee5dd597',
    'Navigation Links',
    '/t/sys_navigation_list',
    'Site Administration',
    'Admin',
    'd6692dc1-9d32-4894-badf95820d09431b'
), (
    'f334d193-8906-4402-a073-d238ee5dd596',
    'Server Host Info',
    '/admin/stats',
    'Site Administration',
    'Admin',
    'd6692dc1-9d32-4894-badf95820d09431b'
), (
    'f334d193-8906-4402-a073-d238ee5dd595',
    'Wetty',
    '/admin/wetty',
    'Site Administration',
    'Admin',
    'd6692dc1-9d32-4894-badf95820d09431b'
), (
    'f334d193-8906-4402-a073-d238ee5dd431',
    'Attachments',
    '/t/sys_attachment_list',
    'Site Administration',
    'Admin',
    'd6692dc1-9d32-4894-badf95820d09431b'
), (
    'f334d193-1111-4402-a073-d238ee5dd431',
    'Dictionary',
    '/t/sys_db_dictionary_list',
    'DB Administration',
    'Admin',
    'd6692dc1-9d32-4894-badf95820d09431b'
), (
    'f334d193-2222-4402-a073-d238ee5dd431',
    'Tables',
    '/t/sys_db_object_list',
    'DB Administration',
    'Admin',
    'd6692dc1-9d32-4894-badf95820d09431b'
);