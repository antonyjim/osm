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

/* Store generated sql statements from apiResource loader */
CREATE TABLE sys_generated_resource (
  PRIMARY KEY (sys_auto_id),
  sys_auto_id INT AUTO_INCREMENT,
  resource_hash CHAR(8) NOT NULL UNIQUE,
  build_id CHAR(8) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
  sql_query JSON NOT NULL
) CHARSET = utf8;

/* Assign role limits to generated resources */
CREATE TABLE sys_generated_resource_role (
  PRIMARY KEY (sys_auto_id),
  sys_auto_id INT AUTO_INCREMENT,
  /* resource_hash is the randomly generated hash that is also the url */
  resource_hash CHAR(8) NOT NULL UNIQUE,
  /* role_limiter is the role that is either allowed or 
  disallowed from accessing the resource */
  role_limiter CHAR(36) NOT NULL,
  /* access_rule is whether the user does or does not have
  access to the resource */
  access_rule BOOLEAN NOT NULL DEFAULT TRUE,

  /* FOREIGN KEY(resource_hash)
    REFERENCES sys_generated_resource(resource_hash)
    ON UPDATE CASCADE
    ON DELETE CASCADE, */

  FOREIGN KEY(role_limiter)
    REFERENCES sys_role(sys_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) CHARSET = utf8;


/* This is just a prototype for later use. Ignore for now

CREATE TABLE sys_pending_request (
  PRIMARY KEY (sys_auto_id),
  sys_auto_id INT AUTO_INCREMENT,
  return_token CHAR(16),
  user_id CHAR(36),
  request_url VARCHAR(255),
  request_time BIGINT,
  request_context JSON,

  FOREIGN KEY(user_id)
    REFERENCES sys_user.sys_id
    ON UPDATE CASCADE
    ON DELETE CASCADE
) CHARSET = utf8; */