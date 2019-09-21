/*
  Create the tables that store metadata and customization
  information for specific form elements and input fields.
*/

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