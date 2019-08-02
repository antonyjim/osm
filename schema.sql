-- source D:\Projects\node\osm\schema.sql

SET @sys_app_scope_sys_id = '74d5c12ea-51e4-68fa-28cefaa9fe5cb53';
SET @root_sys_ou_sys_id = '0ccaa259-b60b-443a-bc91-cb49abc88b86';
SET @root_sys_org_sys_id = '6d7b5144-9060-42d2-aa20-f99294194382';
SET @default_admin_sys_id = 'b42a1170-096a-11e9-b568-0800200c9a66';
SET @default_admin_group_sys_id = 'a3410430-ed58-49e5-8be8baef0ad19e35';
SET @default_admin_role_sys_id = 'd6692dc1-9d32-4894-badf95820d09431b';
SET @default_admin_email = 'antonyjund@gmail.com';

DROP DATABASE IF EXISTS osm;

CREATE DATABASE osm;
USE osm;

-- +-----------------------------------------+
-- |Start Schema for site                    |
-- +-----------------------------------------+

-- Store the application scopes
CREATE TABLE sys_app_scope (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    friendly_name VARCHAR(40),
    scope_prefix CHAR(3) NOT NULL,
    active BOOLEAN DEFAULT TRUE NOT NULL,
    
    UNIQUE(scope_prefix)
) CHARSET = utf8;


CREATE TABLE sys_organization (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    organization_level VARCHAR(40),
    beholden_to CHAR(36) NOT NULL,
    claim CHAR(6) NOT NULL,
    scope_prefix CHAR(3) NOT NULL,
    short_description VARCHAR(255),

    FOREIGN KEY(beholden_to)
        REFERENCES sys_organization(sys_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    FOREIGN KEY(scope_prefix)
        REFERENCES sys_app_scope(scope_prefix)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) CHARSET = utf8;

CREATE TABLE sys_organization_unit (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    ou_level CHAR(36) NOT NULL,
    unit_name VARCHAR(40) NOT NULL,
    auth_claim VARCHAR(12) NOT NULL, -- Used for identifying documents
    UNIQUE(auth_claim, ou_level),

    FOREIGN KEY(ou_level)
        REFERENCES sys_organization(sys_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) CHARSET=utf8;

-- Store all roles
CREATE TABLE sys_role (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    inherits CHAR(36),
    friendly_name VARCHAR(20),
    app_scope CHAR(3),
    active BOOLEAN,

    FOREIGN KEY(inherits)
        REFERENCES sys_role(sys_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    
    FOREIGN KEY(app_scope)
        REFERENCES sys_app_scope(scope_prefix)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) CHARSET = utf8;

-- Store navigation through the site
CREATE TABLE sys_navigation (
    PRIMARY KEY (sys_id),
    sys_id CHAR(36),
    inner_text VARCHAR(40) NOT NULL, -- Inner text of the <a> element
    method VARCHAR(6) NOT NULL DEFAULT 'GET', -- HTTP Request method
    path_name VARCHAR(120) NOT NULL, -- Href of the <a> element
    query_string VARCHAR(120), -- Optional query string parameter
    header VARCHAR(40), -- Header for link
    menu VARCHAR(40), -- Root navigation menu
    active BOOLEAN NOT NULL DEFAULT 1,
    role_required CHAR(36),

    FOREIGN KEY (role_required)
        REFERENCES sys_role(sys_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) CHARSET = utf8;

-- Keep this table to a minimum, only to be used for login, password reset
CREATE TABLE sys_user (
    sys_id CHAR(36) NOT NULL,
    sys_last_updated DATETIME DEFAULT CURRENT_TIMESTAMP(),
    username VARCHAR(36) NOT NULL UNIQUE,
    given_name VARCHAR(40) NOT NULL,
    surname VARCHAR(40) NOT NULL,
    title_name VARCHAR(5),
    home_phone VARCHAR(12),
    work_phone VARCHAR(12),
    other_phone VARCHAR(12),
    email VARCHAR(90) NOT NULL,
    preferred_contact CHAR(2),
    pass_hash BINARY(60),
    ad_user BOOLEAN DEFAULT 0, -- Active Directory User
    unconfirmed_email VARCHAR(90),
    password_email_sent BOOLEAN NOT NULL DEFAULT 0, -- If user has password reset pending
    is_locked BOOLEAN NOT NULL DEFAULT 0,
    is_confirmed BOOLEAN NOT NULL DEFAULT 0, -- Test if user has confirmed their email
    is_active BOOLEAN NOT NULL DEFAULT 1,
    confirmation_token CHAR(36), -- Token used for confirmation and password reset
    invalid_login_count INT(1),
    last_login DATETIME,
    last_pass_change DATETIME,
    app_scope CHAR(3),

    PRIMARY KEY (sys_id),

    INDEX(userName),

    FOREIGN KEY (app_scope)
        REFERENCES sys_app_scope(scope_prefix)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) CHARSET = utf8;

DELIMITER //
CREATE TRIGGER ins_sys_user BEFORE INSERT ON sys_user FOR EACH ROW 
    IF NEW.app_scope IS NULL THEN
        SET NEW.app_scope = 'SYS';
    END IF//

CREATE TRIGGER upd_sys_user BEFORE UPDATE ON sys_user FOR EACH ROW 
    IF NEW.app_scope IS NULL THEN
        SET NEW.app_scope = 'SYS';
    END IF//
DELIMITER ;

CREATE TABLE sys_user_pass_hash_hist (
    PRIMARY KEY(count_of),
    count_of INT AUTO_INCREMENT,
    user_id CHAR(36),
    hash BINARY(60),
    set_at DATETIME DEFAULT CURRENT_TIMESTAMP(),

    FOREIGN KEY(user_id)
        REFERENCES sys_user(sys_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) CHARSET = utf8;

CREATE TABLE sys_group (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    app_scope CHAR(3),
    name VARCHAR(40),
    type VARCHAR(10),

    FOREIGN KEY (app_scope)
        REFERENCES sys_app_scope(scope_prefix)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) CHARSET = utf8;

-- Assign roles to groups
-- This table will actually be stored as an
-- object in memory so not too concerned
-- about efficiency
CREATE TABLE sys_group_role (
    PRIMARY KEY(sys_auto_id),
    sys_auto_id INT AUTO_INCREMENT,
    group_id CHAR(36) NOT NULL,
    role_id CHAR(36) NOT NULL,
    UNIQUE(group_id, role_id),

    FOREIGN KEY(group_id)
        REFERENCES sys_group(sys_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY(role_id)
        REFERENCES sys_role(sys_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) CHARSET = utf8;

-- Store group membership
CREATE TABLE sys_group_membership (
    PRIMARY KEY(sys_auto_id),
    sys_auto_id INT AUTO_INCREMENT,
    user_id CHAR(36),
    group_id CHAR(36),

    FOREIGN KEY (group_id)
        REFERENCES sys_group(sys_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    
    FOREIGN KEY (user_id)
        REFERENCES sys_user(sys_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) CHARSET = utf8;

-- Stores exceptions to group roles
CREATE TABLE sys_user_role (
    PRIMARY KEY(sys_auto_id),
    sys_auto_id INT AUTO_INCREMENT,
    user_id CHAR(36) NOT NULL,
    role_id CHAR(36) NOT NULL,
    UNIQUE(user_id, role_id),

    FOREIGN KEY(user_id)
        REFERENCES sys_user(sys_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY(role_id)
        REFERENCES sys_role(sys_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) CHARSET = utf8;

-- Store ou claims
CREATE TABLE sys_user_org (
    PRIMARY KEY(sys_auto_id),
    sys_auto_id INT AUTO_INCREMENT,
    user_id CHAR(36),
    org_unit CHAR(36),

    FOREIGN KEY(user_id)
        REFERENCES sys_user(sys_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY(org_unit)
        REFERENCES sys_organization_unit(sys_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) CHARSET = utf8;

-- Store information pertaining to database table
CREATE TABLE sys_db_object (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    name VARCHAR(40) NOT NULL, -- Name of the table
    label VARCHAR(40) NOT NULL, -- Friendly name
    plural VARCHAR(40),
    description VARCHAR(80), -- Short Description
    /*
        The auditable field will be used to determine
        whether or not to include fields such as:
         - sys_last_updated_by
         - sys_last_updated_at
         - sys_created_by
         - sys_created_at
    */
    auditable BOOLEAN DEFAULT TRUE,

    /*
        ou_restricted will be used to determine whether
        or not to include the following fields to a table:
         - sys_ou_level
         - sys_ou_claim
    */
    ou_restricted BOOLEAN DEFAULT FALSE,
    /*
        These fields are only used for queries made
        to /api/q/:tablename. It is assumed any other endpoints
        will implement their own authorization
    */
    read_role CHAR(36),
    edit_role CHAR(36),
    delete_role CHAR(36),

    FOREIGN KEY (read_role)
        REFERENCES sys_role(sys_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    FOREIGN KEY (edit_role)
        REFERENCES sys_role(sys_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    FOREIGN KEY (delete_role)
        REFERENCES sys_role(sys_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) CHARSET = utf8;

CREATE TABLE sys_db_dictionary (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36), -- Primary key used for linking to other fields 
    reference_id CHAR(36), -- Foreign key used to reference other fields
    column_name VARCHAR(40),
    column_order INT,
    visible BOOLEAN NOT NULL DEFAULT 1, -- Whether the field shows up on a form or not, overridden by admin_view flag
    admin_view BOOLEAN NOT NULL DEFAULT 0, -- Whether the field can be exposed on the API or not
    readonly BOOLEAN NOT NULL DEFAULT 0,
    label VARCHAR(40), -- Friendly name
    hint VARCHAR(40), -- Popup hint
    type VARCHAR(16), -- Type (boolean, varchar, char, etc...)
    enum CHAR(36), -- Reference the ref_id column on the sys_enum table. Used for data validation
    len INT, -- Length of field, applies to varchar, char
    nullable BOOLEAN,
    required_on_update BOOLEAN DEFAULT 0,
    required_on_create BOOLEAN DEFAULT 1,
    default_view BOOLEAN,
    default_value VARCHAR(40),
    table_name CHAR(36),
    update_key BOOLEAN NOT NULL DEFAULT 0,
    display_field BOOLEAN DEFAULT 0,

    FOREIGN KEY(table_name)
        REFERENCES sys_db_object (sys_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (reference_id)
        REFERENCES sys_db_dictionary (sys_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) CHARSET = utf8;

CREATE TABLE sys_db_dictionary_attr (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    field_id CHAR(36),
    attr_key VARCHAR(40),
    attr_val VARCHAR(40),

    FOREIGN KEY(field_id)
        REFERENCES sys_db_dictionary (sys_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) CHARSET = utf8;

CREATE TABLE sys_view (
    PRIMARY KEY(view_field, view_name),
    view_name VARCHAR(40),
    view_label VARCHAR(40),
    view_field CHAR(36),
    INDEX(view_name),
    FOREIGN KEY (view_field)
        REFERENCES sys_db_dictionary (sys_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) CHARSET=utf8;

CREATE TABLE sys_log (
    PRIMARY KEY(log_key),
    log_key INT AUTO_INCREMENT,
    log_time DATETIME DEFAULT CURRENT_TIMESTAMP(),
    log_message TEXT,
    log_severity INT(1) DEFAULT 3
);

CREATE TABLE sys_log_user LIKE sys_log;
ALTER TABLE sys_log_user ADD COLUMN log_user CHAR(36) NOT NULL;
CREATE TABLE sys_log_request LIKE sys_log;
ALTER TABLE sys_log_request ADD COLUMN request_method VARCHAR(6) DEFAULT 'GET';
ALTER TABLE sys_log_request ADD COLUMN request_uri VARCHAR(100) DEFAULT '/';

-- Create a new trigger to concat the table and role
/* CREATE TRIGGER ins_auth_priv_table BEFORE INSERT ON sys_authorization FOR EACH ROW 
SET new.auth_priv_table = CONCAT((SELECT name FROM sys_db_object WHERE sys_id = NEW.auth_table), '_', (SELECT priv 
FROM sys_priv WHERE sys_id = NEW.auth_priv)); */

CREATE TABLE sys_attachment (
    PRIMARY KEY (sys_id),
    sys_id CHAR(36),
    last_modified DATETIME,
    last_modified_by CHAR(36),
    content_type VARCHAR(40),
    referenced_table CHAR(36),
    referenced_table_record CHAR(36),
    file_name VARCHAR(40),
    file_name_upper VARCHAR(40),
    file_size INT,
    file_contents LONGBLOB,
    UNIQUE(referenced_table_record, file_name),

    FOREIGN KEY (last_modified_by)
        REFERENCES sys_user(sys_id),

    FOREIGN KEY (referenced_table)
        REFERENCES sys_db_object(sys_id)
) CHARSET=utf8;

CREATE TABLE sys_component (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    name VARCHAR(40),
    last_modified DATETIME,
    last_modified_by CHAR(36),
    title VARCHAR(40),
    metadata LONGTEXT,
    version_of INT,

    FOREIGN KEY (last_modified_by) 
        REFERENCES sys_user(sys_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) CHARSET = utf8;

CREATE TABLE sys_component_file (
    PRIMARY KEY (sys_id),
    sys_id CHAR(36),
    parent_component CHAR(36) NOT NULL,
    last_modified DATETIME,
    last_modified_by CHAR(36),
    file_path VARCHAR(250),
    file_name VARCHAR(60),
    file_type VARCHAR(40),
    purpose VARCHAR(20),
    version_of INT,
    contents LONGTEXT,
    UNIQUE(parent_component, file_name, version_of),

    FOREIGN KEY (last_modified_by) 
        REFERENCES sys_user(sys_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    FOREIGN KEY (parent_component)
        REFERENCES sys_component(sys_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) CHARSET = utf8;

CREATE TABLE sys_component_deleted_file AS SELECT * FROM sys_component_file;

CREATE TABLE sys_route_module (
    host VARCHAR(80), -- Host that this module applies to
    description VARCHAR(100), -- Short description
    pre_auth BOOLEAN,
    routing VARCHAR(255), -- What path to use for this module
    file_path VARCHAR(255), -- Path pointing to the express module
    role_id CHAR(36),

    FOREIGN KEY(role_id)
        REFERENCES sys_role(sys_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) CHARSET = utf8;

CREATE TABLE sys_form (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    form_name VARCHAR(40), -- Path to navigatie to /f/${form_name}
    form_title VARCHAR(40), -- Title shown in ui
    form_args VARCHAR(100) -- Hide Tabs, etc
) CHARSET = utf8;

CREATE TABLE sys_form_tab (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    form_id CHAR(36), -- Reference to sys_form
    tab_name VARCHAR(40) DEFAULT 'General',
    tab_title VARCHAR(40) DEFAULT 'General Information',
    table_ref CHAR(36),
    table_args VARCHAR(100),
    fields LONGTEXT,
    custom_component CHAR(36), -- Path pointing to custom component

    FOREIGN KEY(form_id)
        REFERENCES sys_form(sys_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY(table_ref)
        REFERENCES sys_db_object(sys_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    FOREIGN KEY(custom_component)
        REFERENCES sys_component(sys_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) CHARSET = utf8;

-- Store the options for any forms. This is NOT to be used for requirement data. Just misc forms around the site
-- Instead of storing a list of enums for every field, the fields that reference the enums will store a reference
-- to the rows on this table
CREATE TABLE sys_db_enum (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36), -- Store a unique identifier for the key value pair
    ref_id CHAR(36), -- Store a unique identifier for the group of values
    label VARCHAR(40), -- Friendly label for the enums
    value VARCHAR(40),
    display VARCHAR(40),
    active BOOLEAN,

    INDEX(ref_id) -- Make searches on ref_id quick
) CHARSET = utf8;

CREATE TABLE email_message (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    friendly_name VARCHAR(40) NOT NULL,
    sender_name VARCHAR(40),
    sender_address VARCHAR(100) DEFAULT 'osm@osm.anthonyjund.com',
    subject VARCHAR(100),
    html BOOLEAN DEFAULT 1,
    body TEXT,
    last_updated DATETIME,

    INDEX(friendly_name)
) CHARSET = utf8;

CREATE TABLE sys_db_hook (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    description VARCHAR(40) NOT NULL,
    hook_table CHAR(36) NOT NULL,
    hook VARCHAR(40) NOT NULL,
    code TEXT,

    FOREIGN KEY(hook_table)
        REFERENCES sys_db_object(sys_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) CHARSET = utf8;

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

INSERT INTO sys_route_module (host, description, pre_auth, routing, file_path, role_id) VALUES (
    'AJ-7510',
    'Client Application',
    0,
    '*',
    'D:\\Projects\\node\\service-tomorrow\\clientApp',
    NULL
), (
    'AJ-7510',
    'Static Client Resources',
    1,
    '/public',
    'D:\\Projects\\node\\service-tomorrow\\clientApp\\pubServer',
    NULL
);

INSERT INTO sys_navigation (sys_id, inner_text, method, path_name, header, menu, role_required) VALUES (
    'f334d193-8906-4402-a073-d238ee5dd597',
    'Navigation Links',
    'GET',
    '/t/sys_navigation_list',
    'Site Administration',
    'Admin',
    'd6692dc1-9d32-4894-badf95820d09431b'
);