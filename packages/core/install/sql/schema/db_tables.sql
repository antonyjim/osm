/*
  As part of how osm displays data, it needs to have an in depth
  knowledge of how the underlying data is structured. Rather
  than querying INFORMATION_SCHEMA everytime we need information
  about the schema, we can store that information in these tables
  which also allows for rich ui controls and whatnot.
*/

/*
  Store information about tables.
*/
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

/*
  Store information about table columns.
*/
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

/*
  Store special attributes for certain table columns.
*/

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

/*
  Store hook scripts
*/

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