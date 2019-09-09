/*
  Create all the tables required for user interaction with the site
*/

/* Store most information pertinent to user login */
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

/*
  Store a history of password hashes for specified users.
*/
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

/*
  Store a logical or physical group.
*/

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

/*
  Assign roles to groups to make it easier to handle
  permissions for users. User permissions will be
  mapped in the sys_group_membership table.
*/

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

/*
  Map out user to groups here.
*/

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


/*
  Sometimes a user will have a unique role applied
  to them without it being applied to the group or
  inherited roles. Handle that use case here.
*/

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

/*
  Store hows users are represented in the organization structure.
*/

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