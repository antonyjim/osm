/*
  Create core content tables such as news
*/

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