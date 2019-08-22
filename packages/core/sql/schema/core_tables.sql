/*
  Create tables that are vital for the application to start.
*/

/*
  Each application scope will have it's own entry here,
  this table is more of a placeholder and is subject to
  change in future versions.
*/
CREATE TABLE sys_app_scope (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    friendly_name VARCHAR(40),
    scope_prefix CHAR(3) NOT NULL,
    active BOOLEAN DEFAULT TRUE NOT NULL,
    
    UNIQUE(scope_prefix)
) CHARSET = utf8;

/*
  As for organization, each scope will have a set of
  organization units under it. These units can be used
  to control the flow of data as well as the setting
  of permissions. Each individual unit will be stored
  under the sys_organization_unit table.
*/
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

/*
  For each tier on the sys_organization table,
  there exists at least one sys_organization_record
  to provide a model for children to exist.
*/
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

/*
  Each access role will have it's own permissions stored here.
  Roles can also inherit other roles using the inherits field.
*/
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

/*
  Each navigation link in the ui will have a record here.
*/
CREATE TABLE sys_navigation (
    PRIMARY KEY (sys_id),
    sys_id CHAR(36),
    inner_text VARCHAR(40) NOT NULL, -- Inner text of the <a> element
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

/*
  Register custom resource requests.
*/
CREATE TABLE sys_resource_registry (
  PRIMARY KEY (sys_id),
  sys_id CHAR(36),
  rand_hash CHAR(8),
  title VARCHAR(80),
  short_description VARCHAR(255),
  raw_sql TEXT,
  towel_query TEXT,
  proc_name VARCHAR(40)
) CHARSET = utf8;